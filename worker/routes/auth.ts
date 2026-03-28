import { Hono } from 'hono';
import type { Env } from '../types/env';
import { AuthService } from '../services/auth.service';
import { loginSchema, refreshSchema } from '../validation/auth.schema';
import { loginLimiter, refreshLimiter } from '../middleware/rate-limiter';
import { success, error } from '../utils/response';

const authRoutes = new Hono<{ Bindings: Env }>();

// ── POST /api/auth/login ──
authRoutes.post('/login', loginLimiter, async (c) => {
  const body = await c.req.json();
  const { email, password } = loginSchema.parse(body);

  const authService = new AuthService(c.env.DB);
  const user = await authService.verifyCredentials(email, password);

  if (!user) {
    // Same message for non-existent email and wrong password (prevents enumeration)
    return error(c, 'Invalid credentials', 401);
  }

  const jwtExpiry = parseInt(c.env.JWT_EXPIRY) || 900;
  const refreshExpiry = parseInt(c.env.REFRESH_TOKEN_EXPIRY) || 604800;

  const tokens = await authService.createTokens(user, c.env.JWT_SECRET, jwtExpiry, refreshExpiry);

  // Clean up expired tokens in the background
  c.executionCtx.waitUntil(authService.cleanExpiredTokens());

  return success(c, tokens);
});

// ── POST /api/auth/refresh ──
authRoutes.post('/refresh', refreshLimiter, async (c) => {
  const body = await c.req.json();
  const { refreshToken } = refreshSchema.parse(body);

  const authService = new AuthService(c.env.DB);
  const jwtExpiry = parseInt(c.env.JWT_EXPIRY) || 900;
  const refreshExpiry = parseInt(c.env.REFRESH_TOKEN_EXPIRY) || 604800;

  const tokens = await authService.refreshTokens(
    refreshToken,
    c.env.JWT_SECRET,
    jwtExpiry,
    refreshExpiry,
  );

  if (!tokens) {
    return error(c, 'Invalid or expired refresh token', 401);
  }

  return success(c, tokens);
});

export { authRoutes };
