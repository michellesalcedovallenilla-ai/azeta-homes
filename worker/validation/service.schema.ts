import { z } from 'zod';
import { safeString, safeBoolean, safeSortOrder } from './common';

const ALLOWED_ICONS = [
  'Home', 'DollarSign', 'TrendingUp', 'Key', 'Search', 'Compass',
  'Building', 'MapPin', 'Users', 'Shield', 'Heart', 'Star',
] as const;

export const createServiceSchema = z.object({
  title_es: safeString(1, 200),
  title_en: safeString(1, 200),
  description_es: safeString(1, 2000),
  description_en: safeString(1, 2000),
  icon_name: z.enum(ALLOWED_ICONS).default('Home'),
  is_published: safeBoolean.default(false),
  sort_order: safeSortOrder.default(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
