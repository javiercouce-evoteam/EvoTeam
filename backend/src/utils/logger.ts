import { env } from './env.js';

export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  }

  static info(message: string): void {
    console.log(this.formatMessage('info', message));
  }

  static error(message: string, error?: Error): void {
    console.error(this.formatMessage('error', message));
    if (error && env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
  }

  static warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  static debug(message: string): void {
    if (env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message));
    }
  }
}