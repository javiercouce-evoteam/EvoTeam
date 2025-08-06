// Global types and interfaces
import type { Request } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface RequestWithId extends Request {
  requestId: string;
}

export interface RequestWithUserAndId extends RequestWithUser, RequestWithId {}

export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
  statusCode: number;
}

// Environment variables type
export interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CORS_ORIGIN: string | undefined;
}