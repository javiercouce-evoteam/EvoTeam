import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@/types/index.js';
import { getHealth } from '@/controllers/healthController.js';
import authRoutes from './auth.routes.js';

const router = Router();

// Hello World route - Updated for CI/CD Testing
router.get('/', (req: Request, res: Response<ApiResponse<object>>): void => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Pospon API - CI/CD Test Version',
    data: {
      greeting: 'Hello World! 🚀✨',
      version: '1.1.0-test',
      deployment: 'CI/CD Pipeline Test',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      features: [
        'Automated Deployment',
        'Health Monitoring',
        'Error Handling',
        'Security Middlewares'
      ]
    },
  });
});

// Health check route
router.get('/health', getHealth);

// Authentication routes
router.use('/auth', authRoutes);

// API info route
router.get(
  '/info',
  (req: Request, res: Response<ApiResponse<object>>): void => {
    res.status(200).json({
      success: true,
      message: 'API Information',
      data: {
        name: 'Pospon API',
        version: '1.0.0',
        description: 'Backend API for Pospon App',
        endpoints: {
          health: '/api/health',
          info: '/api/info',
          root: '/api/',
          login: '/api/auth/login',
          register: '/api/auth/register',
          logout: '/api/auth/logout',
          profile: '/api/auth/profile',
          debugError: '/api/debug-error',
        },
      },
    });
  }
);

// Debug error route for testing logging
router.get(
  '/debug-error',
  (_req: Request, _res: Response, next: NextFunction): void => {
    const error = new Error('Simulated error for logging test');
    next(error);
  }
);

export default router;
