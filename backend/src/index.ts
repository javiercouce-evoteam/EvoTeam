import { createApp, startServer } from '@/server.js';
import { Logger } from '@/utils/logger.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  Logger.error('Uncaught Exception! Shutting down...', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  Logger.error('Unhandled Rejection! Shutting down...', reason as Error);
  process.exit(1);
});

// Create and start the application
const main = (): void => {
  try {
    const app = createApp();
    startServer(app);
  } catch (error) {
    Logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

// Start the application
main();
