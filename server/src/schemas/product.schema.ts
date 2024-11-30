import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().min(1),
  stock: z.number(),
  active: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const updateProductSchema = productSchema
  .partial()
  .omit({ id: true, createdAt: true, updatedAt: true });

export type Product = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const productInputSchema = productSchema
  .omit({ id:true, createdAt: true, updatedAt: true });

export type ProductInput = z.infer<typeof productInputSchema>;

export const productResponseSchema = productSchema.pick({
  id:true,
  name: true,
  description: true,
  price: true,
  stock: true
});
export type ProductResponse = z.infer<typeof productResponseSchema>;

export const productCreateResponse = productSchema.pick({ id:true });
export type ProductCreateResponse = z.infer<typeof productCreateResponse>