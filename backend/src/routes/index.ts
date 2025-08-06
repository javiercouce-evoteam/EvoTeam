import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '@/types/index.js';
import { getHealth } from '@/controllers/healthController.js';

const router = Router();

// Hello World route
router.get('/', (req: Request, res: Response<ApiResponse<string>>): void => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Pospon API',
    data: 'Hello World! 🚀',
  });
});

// Health check route
router.get('/health', getHealth);

// API info route
router.get('/info', (req: Request, res: Response<ApiResponse<object>>): void => {
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
      },
    },
  });
});

export default router;