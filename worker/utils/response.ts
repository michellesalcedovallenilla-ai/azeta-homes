import type { Context } from 'hono';

export function success<T>(c: Context, data: T, status: number = 200) {
  return c.json({ ok: true, data }, status as any);
}

export function error(c: Context, message: string, status: number = 400) {
  return c.json({ ok: false, error: message }, status as any);
}

export function validationError(c: Context, details: Record<string, string[]>) {
  return c.json({ ok: false, error: 'Validation failed', details }, 400);
}

export function paginated<T>(
  c: Context,
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  return c.json({
    ok: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
