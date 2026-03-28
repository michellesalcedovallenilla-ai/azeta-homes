import type { ErrorHandler } from 'hono';
import { ZodError } from 'zod';

/**
 * Global error handler. Returns safe messages to clients,
 * logs full details server-side (Workers dashboard / wrangler tail).
 */
export const errorHandler: ErrorHandler = (err, c) => {
  // Zod validation errors → 400 with field details
  if (err instanceof ZodError) {
    const details: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const path = issue.path.join('.') || '_root';
      if (!details[path]) details[path] = [];
      details[path].push(issue.message);
    }
    return c.json({ ok: false, error: 'Validation failed', details }, 400);
  }

  // Known HTTP errors
  if (err instanceof HttpError) {
    return c.json({ ok: false, error: err.message }, err.status as any);
  }

  // Unknown errors → 500 with safe message
  console.error('[ERROR]', {
    message: err.message,
    stack: err.stack,
    url: c.req.url,
    method: c.req.method,
  });

  return c.json({ ok: false, error: 'Internal server error' }, 500);
};

// ── Custom error classes ──

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Access denied') {
    super(403, message);
  }
}
