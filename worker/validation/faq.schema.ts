import { z } from 'zod';
import { safeString, safeBoolean, safeSortOrder } from './common';

export const createFaqSchema = z.object({
  question_es: safeString(1, 500),
  question_en: safeString(1, 500),
  answer_es: safeString(1, 5000),
  answer_en: safeString(1, 5000),
  is_published: safeBoolean.default(false),
  sort_order: safeSortOrder.default(0),
});

export const updateFaqSchema = createFaqSchema.partial();

export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;
