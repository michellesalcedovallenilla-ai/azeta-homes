import type { MiddlewareHandler } from 'hono';
import type { Env } from '../types/env';
import { verifyJwt } from '../utils/crypto';

/**
 * JWT authentication middleware for admin routes.
 * Extracts Bearer token, verifies signature + expiry, attaches user to context.
 */
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authorization = c.req.header('authorization');

  if (!authorization) {
    return c.json({ ok: false, error: 'Authentication required' }, 401);
  }

  const parts = authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return c.json({ ok: false, error: 'Invalid authorization format' }, 401);
  }

  const token = parts[1];
  const env = c.env as Env;

  const payload = await verifyJwt(token, env.JWT_SECRET);
  if (!payload) {
    return c.json({ ok: false, error: 'Invalid or expired token' }, 401);
  }

  // Attach user payload to context for use in route handlers
  c.set('user', payload);

  await next();
};
