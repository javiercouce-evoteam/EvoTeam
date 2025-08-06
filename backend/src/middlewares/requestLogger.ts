import type { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger.js';
import type { RequestWithId } from '@/types/index.js';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  const requestId = (req as RequestWithId).requestId;
  
  // Create child logger with request context
  const requestLogger = logger.child({ requestId });
  
  // Log incoming request
  requestLogger.info({
    method: req.method,
    url: req.originalUrl || req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
  }, `Incoming ${req.method} ${req.originalUrl || req.url}`);
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
    
    requestLogger[logLevel]({
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length'),
    }, `${req.method} ${req.originalUrl || req.url} ${res.statusCode} (${duration}ms)`);
  });
  
  // Log response on close (for aborted requests)
  res.on('close', () => {
    if (!res.headersSent) {
      const duration = Date.now() - startTime;
      requestLogger.warn({
        method: req.method,
        url: req.originalUrl || req.url,
        duration: `${duration}ms`,
        status: 'aborted',
      }, `${req.method} ${req.originalUrl || req.url} - Request aborted (${duration}ms)`);
    }
  });
  
  next();
};