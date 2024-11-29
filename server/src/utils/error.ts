import { logger } from "./logger";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational = true,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleError = (error: Error) => {
  if (error instanceof AppError && error.isOperational) {
    return {
      status: 'error',
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
    };
  }

  logger.error(error,"Unexpected Error");
  return {
    status: 'error',
    message: 'Internal server error',
    statusCode: 500,
  };
};