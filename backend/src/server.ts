import express from 'express';
import morgan from 'morgan';
import type { Application } from 'express';

import { env, isDevelopment } from '@/utils/env.js';
import { Logger } from '@/utils/logger.js';
import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler.js';
import { applySecurity } from '@/middlewares/security.js';
import apiRoutes from '@/routes/index.js';

export const createApp = (): Application => {
  const app = express();

  // Apply all security middleware
  applySecurity(app);

  // Logging middleware
  if (isDevelopment) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API routes
  app.use('/api', apiRoutes);

  // Root route
  app.get('/', (req, res) => {
    res.redirect('/api');
  });

  // 404 handler
  app.use(notFoundHandler);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};

export const startServer = (app: Application): void => {
  const server = app.listen(env.PORT, () => {
    Logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
    Logger.info(`📝 Environment: ${env.NODE_ENV}`);
    Logger.info(`🔗 API available at: http://localhost:${env.PORT}/api`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    Logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
      Logger.info('Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    Logger.info('SIGINT received, shutting down gracefully');
    server.close(() => {
      Logger.info('Process terminated');
      process.exit(0);
    });
  });
};