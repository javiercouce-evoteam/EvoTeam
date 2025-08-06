import type { Request, Response, NextFunction } from 'express';
import type { ErrorResponse } from '@/types/index.js';
import { Logger } from '@/utils/logger.js';
import { env } from '@/utils/env.js';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  Logger.error(`Error ${statusCode}: ${message}`, err);

  const errorResponse: ErrorResponse = {
    success: false,
    message,
    error: env.NODE_ENV === 'development' ? err.message : message,
    statusCode,
  };

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};