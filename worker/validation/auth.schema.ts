import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().max(255).transform((v) => v.toLowerCase().trim()),
  password: z.string().min(8).max(128),
});

export const refreshSchema = z.object({
  refreshToken: z.string().regex(/^[0-9a-f]{64}$/, 'Invalid token format'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
