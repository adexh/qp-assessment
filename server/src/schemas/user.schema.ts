import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters').optional(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const updateUserSchema = userSchema
  .partial()
  .omit({ id: true, role: true, createdAt: true, updatedAt: true });

export type User = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const userResponseSchema = userSchema.omit({ password: true });
export type UserResponse = z.infer<typeof userResponseSchema>;