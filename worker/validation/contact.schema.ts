import { z } from 'zod';
import { safeString, safeEmail, safePhone, safeLanguage } from './common';

export const contactFormSchema = z.object({
  name: safeString(1, 100),
  email: safeEmail,
  phone: safePhone,
  message: safeString(10, 2000),
  source: z.enum(['website', 'referral', 'social', 'other']).default('website'),
  language: safeLanguage.default('es'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
