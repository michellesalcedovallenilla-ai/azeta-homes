import { Hono } from 'hono';
import type { Env } from '../types/env';
import { TestimonialService } from '../services/testimonial.service';
import { FaqService } from '../services/faq.service';
import { ServiceService } from '../services/service.service';
import { LeadService } from '../services/lead.service';
import { EmailService } from '../services/email.service';
import { contactFormSchema } from '../validation/contact.schema';
import { publicReadLimiter, contactLimiter } from '../middleware/rate-limiter';
import { hashIp } from '../utils/ip-hash';
import { success, error } from '../utils/response';

const publicRoutes = new Hono<{ Bindings: Env }>();

// ── GET /api/testimonials ──
publicRoutes.get('/testimonials', publicReadLimiter, async (c) => {
  const service = new TestimonialService(c.env.DB);
  const data = await service.listPublished();
  return success(c, data);
});

// ── GET /api/faq ──
publicRoutes.get('/faq', publicReadLimiter, async (c) => {
  const service = new FaqService(c.env.DB);
  const data = await service.listPublished();
  return success(c, data);
});

// ── GET /api/services ──
publicRoutes.get('/services', publicReadLimiter, async (c) => {
  const service = new ServiceService(c.env.DB);
  const data = await service.listPublished();
  return success(c, data);
});

// ── POST /api/contact ──
publicRoutes.post('/contact', contactLimiter, async (c) => {
  const body = await c.req.json();
  const parsed = contactFormSchema.parse(body);

  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || null;
  const ipHash = ip ? await hashIp(ip, c.env.JWT_SECRET) : null;

  const leadService = new LeadService(c.env.DB);
  await leadService.create(parsed, ipHash);

  // Fire-and-forget email notification
  const emailService = new EmailService(c.env.EMAIL_API_KEY, c.env.NOTIFICATION_EMAIL);
  c.executionCtx.waitUntil(
    emailService.sendLeadNotification({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      message: parsed.message,
    }),
  );

  return success(c, { message: 'Thank you for your inquiry. We will contact you shortly.' }, 201);
});

export { publicRoutes };
