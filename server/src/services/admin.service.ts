import { client } from '@/config';
import { AppError } from '@/utils/error';
import { ProductCreateResponse, ProductInput, ProductResponse } from '@/schemas';

export const getProducts = async (): Promise<ProductResponse[]> => {
  return client.product.findMany({
    where:{ OR: [ {deleted: { not:true }}, { deleted: null }] },
    select: {
      id:true,
      name:true,
      stock:true,
      description:true,
      price:true,
      active: true,
      createdAt:true,
      updatedAt:true,
    }
  });
};

export const getProductById = async (id: string): Promise<ProductResponse> => {
  const product = await client.product.findUnique({
    where:{ id },
    select: {
      id:true,
      name:true,
      stock:true,
      description:true,
      price:true,
      active: true,
      createdAt:true,
      updatedAt:true,
    }
  });

  if( !product ) {
    throw new AppError('No Product found', 404);
  }

  return product;
}

export const createProduct = async (data: ProductInput): Promise<ProductCreateResponse> => {
  return client.product.create({
    data,
    select:{
      id:true
    }
  });
}

export const updateProduct = async (
  id: string,
  data: ProductInput
) => {
  return client.product.update({
    where:{ id },
    data
  })
}

export const deleteProduct = async(id: string) => {
  return client.product.update({
    where: { id },
    data: {
      deleted: true,
      active: false
    }
  })
}