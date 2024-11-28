import { z } from 'zod';
import { userSchema } from './user.schema';

export const registerSchema = userSchema.pick({
  email: true,
  password: true,
  name: true,
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const authResponseSchema = z.object({
  user: userSchema.omit({ password: true }),
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;