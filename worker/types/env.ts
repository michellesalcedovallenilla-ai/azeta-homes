export interface Env {
  // Cloudflare bindings
  DB: D1Database;
  RATE_LIMIT_KV: KVNamespace;
  ASSETS: Fetcher;

  // Secrets (set via `wrangler secret put`)
  JWT_SECRET: string;
  ADMIN_EMAIL: string;
  EMAIL_API_KEY: string;
  NOTIFICATION_EMAIL: string;

  // Variables (set in wrangler.toml [vars])
  FRONTEND_ORIGIN: string;
  JWT_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;
  ENVIRONMENT: string;
}
