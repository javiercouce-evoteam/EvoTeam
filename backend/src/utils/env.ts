import { config } from 'dotenv';
import type { EnvConfig } from '@/types/index.js';

// Load environment variables
config();

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
