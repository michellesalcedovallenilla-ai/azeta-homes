import type { MiddlewareHandler } from 'hono';
import type { Env } from '../types/env';
import { hashIp } from '../utils/ip-hash';

interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
  prefix: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export function rateLimiter(config: RateLimitConfig): MiddlewareHandler {
  return async (c, next) => {
    const env = c.env as Env;
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const ipHash = await hashIp(ip, env.JWT_SECRET);
    const key = `rl:${config.prefix}:${ipHash}`;

    const now = Date.now();
    let entry: RateLimitEntry | null = null;

    try {
      const stored = await env.RATE_LIMIT_KV.get(key);
      if (stored) {
        entry = JSON.parse(stored);
      }
    } catch {
      // KV failure: allow the request (fail-open for rate limiting)
    }

    if (!entry || entry.resetAt < now) {
      entry = { count: 0, resetAt: now + config.windowSeconds * 1000 };
    }

    entry.count++;

    const remaining = Math.max(0, config.maxRequests - entry.count);
    const resetSeconds = Math.ceil((entry.resetAt - now) / 1000);

    c.header('X-RateLimit-Limit', config.maxRequests.toString());
    c.header('X-RateLimit-Remaining', remaining.toString());
    c.header('X-RateLimit-Reset', Math.ceil(entry.resetAt / 1000).toString());

    if (entry.count > config.maxRequests) {
      c.header('Retry-After', resetSeconds.toString());
      try {
        await env.RATE_LIMIT_KV.put(key, JSON.stringify(entry), {
          expirationTtl: config.windowSeconds,
        });
      } catch { /* KV write failure: non-fatal */ }
      return c.json({ ok: false, error: 'Too many requests' }, 429);
    }

    try {
      await env.RATE_LIMIT_KV.put(key, JSON.stringify(entry), {
        expirationTtl: config.windowSeconds,
      });
    } catch { /* KV write failure: non-fatal */ }

    await next();
  };
}

// ── Pre-configured rate limiters ──

export const loginLimiter = rateLimiter({
  maxRequests: 5,
  windowSeconds: 900, // 15 minutes
  prefix: 'login',
});

export const refreshLimiter = rateLimiter({
  maxRequests: 10,
  windowSeconds: 900,
  prefix: 'refresh',
});

export const contactLimiter = rateLimiter({
  maxRequests: 10,
  windowSeconds: 3600, // 1 hour
  prefix: 'contact',
});

export const analyticsLimiter = rateLimiter({
  maxRequests: 100,
  windowSeconds: 60,
  prefix: 'analytics',
});

export const adminLimiter = rateLimiter({
  maxRequests: 60,
  windowSeconds: 60,
  prefix: 'admin',
});

export const publicReadLimiter = rateLimiter({
  maxRequests: 120,
  windowSeconds: 60,
  prefix: 'public',
});
