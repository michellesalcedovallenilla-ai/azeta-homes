import { cors as honoCors } from 'hono/cors';
import type { Env } from '../types/env';

export function createCors() {
  return honoCors({
    origin: (origin, c) => {
      const env = c.env as Env;
      const allowed = env.FRONTEND_ORIGIN || 'http://localhost:3000';
      // Allow the configured frontend origin
      if (origin === allowed) return origin;
      // Allow localhost in development
      if (env.ENVIRONMENT !== 'production' && origin?.startsWith('http://localhost')) {
        return origin;
      }
      return '';
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
    credentials: true,
  });
}
