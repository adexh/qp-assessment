import { z } from 'zod';

export const idSchema = z.union([z.string().uuid(), z.string().cuid()]);

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type Pagination = z.infer<typeof paginationSchema>;