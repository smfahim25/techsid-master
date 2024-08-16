import createApp from './app.js';
import config from './app/config/index.js';
import prisma from './app/utils/prismaClient.js';

let server;
const port = config.PORT || 4000;

async function main() {
  const app = createApp();
  try {
    server = app.listen(port, () => {
      console.log(`App is running on port - ${port}`);
    });
  } catch (error) {
    console.log('Failed to start the server:', error);
    // process.exit(1); // Exit with error code if server fails to start
  }
}

main();

// Gracefully handle unhandled promise rejections
process.on('unhandledRejection', async (err) => {
  console.log('Unhandled Rejection detected, shutting down...', err);
  await shutdownServer(1); // Exit with error code
});

// Gracefully handle uncaught exceptions
process.on('uncaughtException', async (err) => {
  console.log('Uncaught Exception detected, shutting down...', err);
  await shutdownServer(1); // Exit with error code
});

// Handle SIGTERM signal for graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await shutdownServer(0); // Exit with success code
});

// Graceful shutdown function
async function shutdownServer(exitCode) {
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');
      await prisma.$disconnect();
      process.exit(exitCode);
    });

    // Force shutdown after 10 seconds if server doesn't close
    setTimeout(() => {
      console.log('Forcing server shutdown');
      process.exit(exitCode);
    }, 10000);
  } else {
    await prisma.$disconnect();
    process.exit(exitCode);
  }
}
