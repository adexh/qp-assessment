import { StacktraceObject } from "util";
import { logger } from "./logger";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational = true,
    public originalError?: Error | unknown,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    
    if( originalError instanceof Error && originalError.stack ) {
      this.stack = originalError.stack;
    }
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

  logger.error(error.stack,"Unexpected Error");
  return {
    status: 'error',
    message: 'Internal server error',
    statusCode: 500,
  };
};