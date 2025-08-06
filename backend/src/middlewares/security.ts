import type { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xssClean from 'xss-clean';
import hpp from 'hpp';

import { env, isDevelopment } from '@/utils/env.js';
import { generalLimiter } from './rateLimiter.js';

export const applySecurity = (app: Application): void => {
  // Disable x-powered-by header
  app.disable('x-powered-by');

  // Helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false, // Disable for API compatibility
    })
  );

  // CORS configuration with strict origins
  const allowedOrigins = [
    'http://localhost:3000', // Next.js dev server
    'http://localhost:3001', // Backend dev server
    'exp://127.0.0.1:8081', // Expo dev server
    'exp://localhost:8081', // Expo dev server alternative
  ];

  // Add production origins from environment
  if (env.CORS_ORIGIN && env.CORS_ORIGIN !== 'http://localhost:3000') {
    allowedOrigins.push(env.CORS_ORIGIN);
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        // In development, be more permissive
        if (isDevelopment) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
        'X-API-Key',
      ],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400, // 24 hours
    })
  );

  // XSS protection
  app.use(xssClean());

  // HTTP Parameter Pollution protection
  app.use(
    hpp({
      whitelist: ['sort', 'fields', 'page', 'limit', 'filter'], // Allow these parameters to be duplicated
    })
  );

  // Apply general rate limiting
  app.use(generalLimiter);
};
