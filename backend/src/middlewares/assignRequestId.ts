import type { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { RequestWithId } from '@/types/index.js';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const assignRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Generate unique request ID
  const requestId = uuidv4();

  // Assign to request object
  (req as RequestWithId).requestId = requestId;

  // Add to response headers for client tracking
  res.setHeader('X-Request-ID', requestId);

  next();
};
