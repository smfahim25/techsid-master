import config from "./app/config";
import prisma from "./app/utils/prismaClient";

let server;
const port = config.PORT || 4000


async function main() {
  const app = createApp();

  try {
    server = app.listen(port, () => {
      logger.info(`App is running on port - ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1); // Exit with error code if server fails to start
  }
}

main();

// Gracefully handle unhandled promise rejections
process.on('unhandledRejection', async (err) => {
  logger.error('Unhandled Rejection detected, shutting down...', err);
  await shutdownServer(1); // Exit with error code
});

// Gracefully handle uncaught exceptions
process.on('uncaughtException', async (err) => {
  logger.error('Uncaught Exception detected, shutting down...', err);
  await shutdownServer(1); // Exit with error code
});

// Handle SIGTERM signal for graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await shutdownServer(0); // Exit with success code
});

// Graceful shutdown function
async function shutdownServer(exitCode) {
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      await prisma.$disconnect();
      process.exit(exitCode);
    });

    // Force shutdown after 10 seconds if server doesn't close
    setTimeout(() => {
      logger.error('Forcing server shutdown');
      process.exit(exitCode);
    }, 10000);
  } else {
    await prisma.$disconnect();
    process.exit(exitCode);
  }
} 