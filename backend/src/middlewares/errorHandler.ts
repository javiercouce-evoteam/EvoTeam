import type { Request, Response, NextFunction } from 'express';
import type { ErrorResponse, RequestWithId } from '@/types/index.js';
import { logger } from '@/utils/logger.js';
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
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Get requestId from request
  const requestId = (req as RequestWithId).requestId;

  // Create child logger with request context
  const requestLogger = requestId ? logger.child({ requestId }) : logger;

  // Log error with context
  requestLogger.error(
    {
      err,
      statusCode,
      method: req.method,
      url: req.originalUrl || req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
    },
    `Error ${statusCode}: ${message}`
  );

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
  _next: NextFunction
): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  _next(error);
};
