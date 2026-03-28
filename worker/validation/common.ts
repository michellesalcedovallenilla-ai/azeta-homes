import { z } from 'zod';
import { sanitizeText } from '../utils/sanitize';

/** String field that strips HTML and normalizes whitespace */
export function safeString(min: number, max: number) {
  return z.string().min(min).max(max).transform(sanitizeText);
}

/** Validated + lowercased email */
export const safeEmail = z.string().email().max(255).transform((v) => v.toLowerCase().trim());

/** Optional phone: digits, spaces, dashes, parens, optional leading + */
export const safePhone = z
  .string()
  .regex(/^\+?[\d\s\-()]{7,20}$/, 'Invalid phone number format')
  .optional()
  .or(z.literal(''));

/** URL that must be https:// */
export const safeUrl = z
  .string()
  .url()
  .max(2048)
  .refine((v) => v.startsWith('https://'), { message: 'URL must use HTTPS' })
  .optional()
  .or(z.literal(''));

/** Positive integer ID (from URL params) */
export const safeId = z.coerce.number().int().positive();

/** Pagination query params */
export const safePagination = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** Sort order (0-9999) */
export const safeSortOrder = z.coerce.number().int().min(0).max(9999);

/** Boolean coercion (accepts "true", "1", true, 1) */
export const safeBoolean = z.coerce.boolean();

/** Language enum */
export const safeLanguage = z.enum(['es', 'en']);
