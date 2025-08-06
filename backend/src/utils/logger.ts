import pino from 'pino';
import { env } from './env.js';

// Create pino logger instance
const loggerConfig: {
  level: string;
  formatters: {
    level: (label: string) => { level: string };
  };
  transport?: {
    target: string;
    options: {
      colorize: boolean;
      translateTime: string;
      ignore: string;
    };
  };
} = {
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  formatters: {
    level: (_label: string) => {
      return { level: _label };
    },
  },
};

// Add transport only in non-production environments
if (env.NODE_ENV !== 'production') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

const logger = pino(loggerConfig);

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
