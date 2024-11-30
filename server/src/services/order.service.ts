import { client } from "@/config";
import { AppError } from "@/utils/error";
import { OrderItemCreate, OrderItemInput, OrderResponse } from "@/schemas";
import { Order, OrderItem } from "@prisma/client";

export const createOrder = async (
  userId: string,
  orderItems: OrderItemInput[]
): Promise<OrderResponse> => {

  const order = await client.$transaction( async (orderTx) => {

    const orderItemsMap = new Map<string, {orderItem: OrderItemInput, newStock?: number }>();
    orderItems.forEach( item => orderItemsMap.set(item.productId, { orderItem: item }) );

    const productIds = orderItems.map( item => item.productId );

    const availabileProducts = await orderTx.product.findMany({
      where:{
        AND:[
          { id: { in: productIds }},
          { active: true }
        ]
      },
      select: {
        id:true,
        name:true,
        stock: true,
        price: true
      }
    });

    const orderCreate: OrderItemCreate[] = []

    for( const availabileProduct of availabileProducts ) {
      const orderItem = orderItemsMap.get(availabileProduct.id)?.orderItem;

      if( !orderItem ) throw new AppError('Some of the products not available', 424);;

      if( orderItem && orderItem.quantity > availabileProduct.stock ) {
        throw new AppError(`Product ${availabileProduct.name} is out of stock`, 424);
      }
      
      orderItemsMap.set(
        orderItem.productId,
        { orderItem, newStock: availabileProduct.stock - orderItem.quantity }
      )

      orderCreate.push({ ...orderItem, price: availabileProduct.price });
    }

    const newOrder = await orderTx.order.create({
      data: {
        userId,
        orderItems: {
          create: orderCreate
        }
      },
      select: {
        id:true,
        userId: true,
        createdAt: true
      }
    })

    for( const [id,orderItem] of orderItemsMap ) {

      if( orderItem.newStock === undefined )
        throw new AppError('Stock update failed', 400)

      await orderTx.product.update({
        where: { id },
        data: { stock: orderItem.newStock }
      })
    }

    return newOrder;
  })

  return order
}

export const getOrderById = async (id:string) => {
  const order = await client.order.findUnique({
    where: { id },
    select: {
      orderItems: {
        select: {
          product: {
            select: {
              id:true,
              name:true,
            }
          },
          price: true,
          quantity: true
        }
      }
    }
  })

  if( !order )
    throw new AppError('Order not found', 404);

  return order;
}

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  const orders = await client.order.findMany({
    where: { userId },
  })

  return orders;
}
