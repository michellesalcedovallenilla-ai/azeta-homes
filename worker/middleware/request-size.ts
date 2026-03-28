import type { MiddlewareHandler } from 'hono';

const MAX_BODY_SIZE = 1_048_576; // 1MB

export const requestSizeLimit: MiddlewareHandler = async (c, next) => {
  const contentLength = c.req.header('content-length');

  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (!isNaN(size) && size > MAX_BODY_SIZE) {
      return c.json({ ok: false, error: 'Request entity too large' }, 413);
    }
  }

  await next();
};
