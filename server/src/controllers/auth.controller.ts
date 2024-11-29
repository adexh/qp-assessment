import { Request, Response } from 'express';
import * as authService from '@/services/auth.service';
import { AppError } from '@/utils/error';
import { RegisterInput, LoginInput } from '@/schemas';
import { config } from '@/config';

export const register = async (req: Request, res: Response) => {
  const data = req.body as RegisterInput;
  
  try {
    const result = await authService.register(data);
    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Registration failed', 500, false);
  }
};

export const login = async (req: Request, res: Response) => {
  const data = req.body as LoginInput;
  
  try {
    const result = await authService.login(data);
    res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Login failed', 500);
  }
};