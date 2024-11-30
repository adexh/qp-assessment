import { Request, Response } from 'express';
import * as userService from '@/services/user.service';
import * as productService from '@/services/product.service';
import * as orderService from '@/services/order.service';

import { AppError } from '@/utils/error';
import { orderInputSchema, orderItemInputSchema, UpdateUserInput } from '@/schemas';
import { idSchema } from '@/schemas/common.schema';
import { logger } from '@/utils/logger';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    throw new AppError('Failed to fetch users', 500,false,error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id);
    const user = await userService.getUserById(id);
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch user', 500, false, error);
  }
};

export const getProfileInfo = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.user?.id);

    const user = await userService.getUserById(id);
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch user', 500, false, error);
  }
}

export const updateLoggedInUser = async (req: Request, res: Response) => {
  try {
    const id = idSchema.safeParse(req.user?.id);
    if( !id || id.data === undefined ) {
      throw new AppError('User id not present',400);
    }

    const data = req.body as UpdateUserInput;
    
    const user = await userService.updateUser(
      id.data,
      data,
      req.user!.id,
      req.user!.role
    );
    
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to update user', 500,false,error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id);
    const data = req.body as UpdateUserInput;
    
    const user = await userService.updateUser(
      id,
      data,
      req.user!.id,
      req.user!.role
    );
    
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to update user', 500,false,error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id);
    const product = await productService.getProductById(id);

    res.json({
      status: 'success',
      data: product
    })
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch product', 500,false,error);
  }
}

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();

    res.json({
      status: 'success',
      data: products
    })
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch products', 500,false,error);
  }
}

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = idSchema.parse(req.user?.id);

    const orders = await orderService.getOrdersByUserId( userId );

    res.json({
      status: 'success',
      data: orders
    })
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch orders', 500,false,error);
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)

    const order = await orderService.getOrderById( id );

    res.json({
      status: 'success',
      data: order
    })
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch the order', 500, false, error);
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = idSchema.parse( req.user?.id );
    const orderInput = orderInputSchema.parse(req.body);

    const order = await orderService.createOrder(userId, orderInput.orderItems);

    res.json({
      status: 'success',
      data: order
    })
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to create the order', 500, false, error);
  }
}