import { Request, Response } from 'express';
import * as userService from '@/services/user.service';
import { AppError } from '@/utils/error';
import { UpdateUserInput } from '@/schemas';
import { idSchema } from '@/schemas/common.schema';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    throw new AppError('Failed to fetch users', 500);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params);
    const user = await userService.getUserById(id);
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch user', 500);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params);
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
    throw new AppError('Failed to update user', 500);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params);
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to delete user', 500);
  }
};