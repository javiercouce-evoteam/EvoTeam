import pino from 'pino';
import { env } from './env.js';

// Create pino logger instance
const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    }
  } : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

// Export the pino instance directly
export { logger };

// Legacy Logger class for backward compatibility
export class Logger {
  static info(message: string, meta?: object): void {
    logger.info(meta, message);
  }

  static error(message: string, error?: Error | object): void {
    if (error instanceof Error) {
      logger.error({ err: error }, message);
    } else {
      logger.error(error, message);
    }
  }

  static warn(message: string, meta?: object): void {
    logger.warn(meta, message);
  }

  static debug(message: string, meta?: object): void {
    logger.debug(meta, message);
  }
}