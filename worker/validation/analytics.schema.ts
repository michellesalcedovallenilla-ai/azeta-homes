import { z } from 'zod';

const EVENT_TYPES = [
  'page_view',
  'button_click',
  'form_submit',
  'calendly_open',
  'whatsapp_click',
  'calculator_use',
  'language_switch',
  'testimonial_view',
  'scroll_depth',
  'time_on_page',
] as const;

export const analyticsEventSchema = z.object({
  event_type: z.enum(EVENT_TYPES),
  event_data: z.string().max(1000).optional(),
  page_url: z.string().max(2048).optional(),
  referrer: z.string().max(2048).optional(),
  session_id: z.string().max(64).optional(),
  language: z.enum(['es', 'en']).optional(),
});

export const analyticsQuerySchema = z.object({
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  event_type: z.enum(EVENT_TYPES).optional(),
  group_by: z.enum(['day', 'hour', 'event_type']).default('day'),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
export type AnalyticsQueryInput = z.infer<typeof analyticsQuerySchema>;
