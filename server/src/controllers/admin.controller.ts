import { Request, Response } from 'express';
import * as adminService from '@/services/admin.service';
import { AppError } from '@/utils/error';
import { idSchema, productInputSchema, productSchema } from '@/schemas';
import * as userService from '@/services/user.service'

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await adminService.getProducts();
    res.json({
      status:'succes',
      data: products,
    });
  } catch (error) {
    if( error instanceof AppError )
      throw error;
    throw new AppError('Failed to fetch products',500,false,error);
  }
}

export const getProductById = async (req: Request, res: Response) =>{
  try {
    const id = idSchema.parse(req.params.id);
    const product = await adminService.getProductById(id);
    res.json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    throw new AppError('Failed to fetch product',500,false,error);
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = productInputSchema.parse(req.body);
    const result = await adminService.createProduct(product);
    res.json({
      status: 'success',
      data: result
    })
  } catch (error) {
    if( error instanceof AppError )
      throw error;
    throw new AppError('Failed to create Product',500,false,error);
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id);
    const product = productInputSchema.parse(req.body);
    await adminService.updateProduct( id, product);

    res.json({
      status: 'success',
    })
  } catch (error) {
    if( error instanceof AppError )
      throw error;
    throw new AppError('Failed to create Product',500,false,error);
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id);
    await adminService.deleteProduct(id);

    res.status(204).send();
  } catch (error) {
    if( error instanceof AppError )
      throw error;
    throw new AppError('Failed to delete Product',500,false,error);
  }
}