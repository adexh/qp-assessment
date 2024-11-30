import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number()
})

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  orderItems: z.array(orderItemSchema),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
})


export type OrderItem = z.infer<typeof orderItemSchema>;
export const orderItemInputSchema = orderItemSchema.omit({ orderId: true, id: true, price: true })
export type OrderItemInput = z.infer<typeof orderItemInputSchema>
export const orderItemCreateSchema = orderItemSchema.omit({ id: true, orderId:true })
export type OrderItemCreate = z.infer<typeof orderItemCreateSchema>;

export const orderInputSchema = z.object( { orderItems: z.array(orderItemInputSchema) })
export type OrderInput = z.infer<typeof orderInputSchema>

export const orderResponseSchema = orderSchema.pick({ id:true, userId: true, createdAt: true })
export type OrderResponse = z.infer<typeof orderResponseSchema>