import type { AdminUser, RefreshToken } from '../types/models';
import { hashPassword, verifyPassword, signJwt, generateRefreshToken, hashToken } from '../utils/crypto';

export class AuthService {
  constructor(private db: D1Database) {}

  async findUserByEmail(email: string): Promise<AdminUser | null> {
    const result = await this.db
      .prepare('SELECT * FROM admin_users WHERE email = ? AND is_active = 1')
      .bind(email)
      .first<AdminUser>();
    return result || null;
  }

  async verifyCredentials(email: string, password: string): Promise<AdminUser | null> {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    const valid = await verifyPassword(password, user.password_hash, user.salt);
    return valid ? user : null;
  }

  async createTokens(user: AdminUser, jwtSecret: string, jwtExpiry: number, refreshExpiry: number) {
    const accessToken = await signJwt(
      { sub: user.id, email: user.email, role: user.role },
      jwtSecret,
      jwtExpiry,
    );

    const refreshTokenRaw = generateRefreshToken();
    const refreshTokenHash = await hashToken(refreshTokenRaw);
    const expiresAt = new Date(Date.now() + refreshExpiry * 1000).toISOString();

    await this.db
      .prepare('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)')
      .bind(user.id, refreshTokenHash, expiresAt)
      .run();

    await this.db
      .prepare("UPDATE admin_users SET last_login_at = datetime('now') WHERE id = ?")
      .bind(user.id)
      .run();

    return {
      accessToken,
      refreshToken: refreshTokenRaw,
      expiresIn: jwtExpiry,
    };
  }

  async refreshTokens(
    rawToken: string,
    jwtSecret: string,
    jwtExpiry: number,
    refreshExpiry: number,
  ) {
    const tokenHash = await hashToken(rawToken);

    const stored = await this.db
      .prepare(
        "SELECT * FROM refresh_tokens WHERE token_hash = ? AND is_revoked = 0 AND expires_at > datetime('now')",
      )
      .bind(tokenHash)
      .first<RefreshToken>();

    if (!stored) {
      // Check if this is a revoked token (theft detection)
      const revoked = await this.db
        .prepare('SELECT * FROM refresh_tokens WHERE token_hash = ? AND is_revoked = 1')
        .bind(tokenHash)
        .first<RefreshToken>();

      if (revoked) {
        // Token reuse detected → revoke ALL tokens for this user
        await this.db
          .prepare('UPDATE refresh_tokens SET is_revoked = 1 WHERE user_id = ?')
          .bind(revoked.user_id)
          .run();
        console.error('[SECURITY] Refresh token reuse detected', { userId: revoked.user_id });
      }

      return null;
    }

    // Revoke the used token (single-use rotation)
    await this.db
      .prepare('UPDATE refresh_tokens SET is_revoked = 1 WHERE id = ?')
      .bind(stored.id)
      .run();

    const user = await this.db
      .prepare('SELECT * FROM admin_users WHERE id = ? AND is_active = 1')
      .bind(stored.user_id)
      .first<AdminUser>();

    if (!user) return null;

    return this.createTokens(user, jwtSecret, jwtExpiry, refreshExpiry);
  }

  async cleanExpiredTokens() {
    await this.db
      .prepare("DELETE FROM refresh_tokens WHERE expires_at < datetime('now') OR is_revoked = 1")
      .run();
  }
}
