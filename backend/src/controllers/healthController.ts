import type { Request, Response } from 'express';
import type { ApiResponse } from '@/types/index.js';
import { env } from '@/utils/env.js';

interface HealthData {
  status: 'ok';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

export const getHealth = (
  req: Request,
  res: Response<ApiResponse<HealthData>>
): void => {
  const healthData: HealthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    version: '1.0.0',
  };

  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: healthData,
  });
};