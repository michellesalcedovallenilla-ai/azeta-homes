import { Hono } from 'hono';
import type { Env } from '../types/env';
import { authMiddleware } from '../middleware/auth';
import { adminLimiter } from '../middleware/rate-limiter';
import { TestimonialService } from '../services/testimonial.service';
import { FaqService } from '../services/faq.service';
import { ServiceService } from '../services/service.service';
import { LeadService } from '../services/lead.service';
import { AnalyticsService } from '../services/analytics.service';
import { createTestimonialSchema, updateTestimonialSchema } from '../validation/testimonial.schema';
import { createFaqSchema, updateFaqSchema } from '../validation/faq.schema';
import { createServiceSchema, updateServiceSchema } from '../validation/service.schema';
import { analyticsQuerySchema } from '../validation/analytics.schema';
import { safePagination, safeId } from '../validation/common';
import { success, error, paginated } from '../utils/response';
import { NotFoundError } from '../middleware/error-handler';

const adminRoutes = new Hono<{ Bindings: Env }>();

// All admin routes require auth + rate limiting
adminRoutes.use('*', adminLimiter, authMiddleware);

// ═══════════════════════════════════════
// TESTIMONIALS CRUD
// ═══════════════════════════════════════

adminRoutes.get('/testimonials', async (c) => {
  const { page, limit } = safePagination.parse(c.req.query());
  const service = new TestimonialService(c.env.DB);
  const { data, total } = await service.listAll(page, limit);
  return paginated(c, data, total, page, limit);
});

adminRoutes.get('/testimonials/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new TestimonialService(c.env.DB);
  const item = await service.getById(id);
  if (!item) throw new NotFoundError('Testimonial not found');
  return success(c, item);
});

adminRoutes.post('/testimonials', async (c) => {
  const body = await c.req.json();
  const parsed = createTestimonialSchema.parse(body);
  const service = new TestimonialService(c.env.DB);
  const item = await service.create(parsed);
  return success(c, item, 201);
});

adminRoutes.put('/testimonials/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const body = await c.req.json();
  const parsed = updateTestimonialSchema.parse(body);
  const service = new TestimonialService(c.env.DB);
  const item = await service.update(id, parsed);
  if (!item) throw new NotFoundError('Testimonial not found');
  return success(c, item);
});

adminRoutes.delete('/testimonials/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new TestimonialService(c.env.DB);
  const deleted = await service.delete(id);
  if (!deleted) throw new NotFoundError('Testimonial not found');
  return success(c, { deleted: true });
});

// ═══════════════════════════════════════
// FAQ CRUD
// ═══════════════════════════════════════

adminRoutes.get('/faq', async (c) => {
  const { page, limit } = safePagination.parse(c.req.query());
  const service = new FaqService(c.env.DB);
  const { data, total } = await service.listAll(page, limit);
  return paginated(c, data, total, page, limit);
});

adminRoutes.get('/faq/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new FaqService(c.env.DB);
  const item = await service.getById(id);
  if (!item) throw new NotFoundError('FAQ item not found');
  return success(c, item);
});

adminRoutes.post('/faq', async (c) => {
  const body = await c.req.json();
  const parsed = createFaqSchema.parse(body);
  const service = new FaqService(c.env.DB);
  const item = await service.create(parsed);
  return success(c, item, 201);
});

adminRoutes.put('/faq/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const body = await c.req.json();
  const parsed = updateFaqSchema.parse(body);
  const service = new FaqService(c.env.DB);
  const item = await service.update(id, parsed);
  if (!item) throw new NotFoundError('FAQ item not found');
  return success(c, item);
});

adminRoutes.delete('/faq/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new FaqService(c.env.DB);
  const deleted = await service.delete(id);
  if (!deleted) throw new NotFoundError('FAQ item not found');
  return success(c, { deleted: true });
});

// ═══════════════════════════════════════
// SERVICES CRUD
// ═══════════════════════════════════════

adminRoutes.get('/services', async (c) => {
  const { page, limit } = safePagination.parse(c.req.query());
  const service = new ServiceService(c.env.DB);
  const { data, total } = await service.listAll(page, limit);
  return paginated(c, data, total, page, limit);
});

adminRoutes.get('/services/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new ServiceService(c.env.DB);
  const item = await service.getById(id);
  if (!item) throw new NotFoundError('Service not found');
  return success(c, item);
});

adminRoutes.post('/services', async (c) => {
  const body = await c.req.json();
  const parsed = createServiceSchema.parse(body);
  const service = new ServiceService(c.env.DB);
  const item = await service.create(parsed);
  return success(c, item, 201);
});

adminRoutes.put('/services/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const body = await c.req.json();
  const parsed = updateServiceSchema.parse(body);
  const service = new ServiceService(c.env.DB);
  const item = await service.update(id, parsed);
  if (!item) throw new NotFoundError('Service not found');
  return success(c, item);
});

adminRoutes.delete('/services/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new ServiceService(c.env.DB);
  const deleted = await service.delete(id);
  if (!deleted) throw new NotFoundError('Service not found');
  return success(c, { deleted: true });
});

// ═══════════════════════════════════════
// LEADS
// ═══════════════════════════════════════

adminRoutes.get('/leads', async (c) => {
  const { page, limit } = safePagination.parse(c.req.query());
  const status = c.req.query('status') || undefined;
  const service = new LeadService(c.env.DB);
  const { data, total } = await service.list(page, limit, status);
  return paginated(c, data, total, page, limit);
});

adminRoutes.get('/leads/:id', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const service = new LeadService(c.env.DB);
  const item = await service.getById(id);
  if (!item) throw new NotFoundError('Lead not found');
  return success(c, item);
});

adminRoutes.put('/leads/:id/status', async (c) => {
  const id = safeId.parse(c.req.param('id'));
  const body = await c.req.json();
  const status = ['new', 'contacted', 'qualified', 'converted', 'closed'].includes(body.status)
    ? body.status
    : null;
  if (!status) return error(c, 'Invalid status value', 400);

  const service = new LeadService(c.env.DB);
  const item = await service.updateStatus(id, status);
  if (!item) throw new NotFoundError('Lead not found');
  return success(c, item);
});

// ═══════════════════════════════════════
// ANALYTICS (Admin View)
// ═══════════════════════════════════════

adminRoutes.get('/analytics', async (c) => {
  const query = analyticsQuerySchema.parse(c.req.query());
  const service = new AnalyticsService(c.env.DB);
  const data = await service.getAggregated(
    query.start_date,
    query.end_date,
    query.event_type,
    query.group_by,
  );
  return success(c, data);
});

export { adminRoutes };
