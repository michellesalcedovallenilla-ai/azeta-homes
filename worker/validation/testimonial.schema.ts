import { z } from 'zod';
import { safeString, safeUrl, safeBoolean, safeSortOrder } from './common';

export const createTestimonialSchema = z.object({
  author_name: safeString(1, 200),
  author_location: safeString(1, 200),
  content_es: safeString(1, 5000),
  content_en: safeString(1, 5000),
  image_url: safeUrl,
  is_published: safeBoolean.default(false),
  sort_order: safeSortOrder.default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
