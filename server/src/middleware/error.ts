import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError, handleError } from '@/utils/error';
import { ZodError } from 'zod';
import { config } from '@/config';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }));

    res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors,
    });
    return;
  }

  const error = handleError(err);

  // Only include stack trace in development
  const response = {
    ...error,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.status(error.statusCode).json(response);
};