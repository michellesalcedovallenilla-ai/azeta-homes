import { Hono } from 'hono';
import type { Env } from '../types/env';
import { AnalyticsService } from '../services/analytics.service';
import { analyticsEventSchema } from '../validation/analytics.schema';
import { analyticsLimiter } from '../middleware/rate-limiter';
import { hashIp } from '../utils/ip-hash';
import { success } from '../utils/response';

const analyticsRoutes = new Hono<{ Bindings: Env }>();

// ── POST /api/analytics/event ──
analyticsRoutes.post('/event', analyticsLimiter, async (c) => {
  const body = await c.req.json();
  const parsed = analyticsEventSchema.parse(body);

  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || null;
  const ipHash = ip ? await hashIp(ip, c.env.JWT_SECRET) : null;
  const userAgent = c.req.header('user-agent') || null;

  const service = new AnalyticsService(c.env.DB);

  // Fire-and-forget: don't block the response
  c.executionCtx.waitUntil(service.trackEvent(parsed, ipHash, userAgent));

  return success(c, null, 202);
});

export { analyticsRoutes };
