import { Hono } from 'hono';
import type { Env } from './types/env';
import { securityHeaders } from './middleware/security-headers';
import { createCors } from './middleware/cors';
import { requestSizeLimit } from './middleware/request-size';
import { errorHandler } from './middleware/error-handler';
import { publicRoutes } from './routes/public';
import { authRoutes } from './routes/auth';
import { analyticsRoutes } from './routes/analytics';
import { adminRoutes } from './routes/admin';

const app = new Hono<{ Bindings: Env }>();

// ── Global Middleware (applied to all routes) ──
app.use('*', securityHeaders);
app.use('/api/*', createCors());
app.use('/api/*', requestSizeLimit);

// ── Global Error Handler ──
app.onError(errorHandler);

// ── API Routes ──
app.route('/api', publicRoutes);
app.route('/api/auth', authRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/admin', adminRoutes);

// ── Health Check ──
app.get('/api/health', (c) => {
  return c.json({ ok: true, timestamp: new Date().toISOString() });
});

// ── Static Assets Fallback ──
// All non-/api/ routes serve the frontend via Cloudflare Assets
app.all('*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
