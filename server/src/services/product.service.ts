import { client } from '@/config/index';
import { ProductResponse } from '@/schemas';
import { AppError } from '@/utils/error';

export const getProducts = async (): Promise<ProductResponse[]> => {
  return client.product.findMany({
    where: {
      AND: [
        { active: true },
        { stock: { gt: 0 } }
      ]
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
    }
  })
}

export const getProductById = async(id:string): Promise<ProductResponse> => {
  const product = await client.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true
    }
  })

  if( !product ) 
    throw new AppError('Product not found',404);

  return product
}