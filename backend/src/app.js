import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import notFound from './app/middlewares/notFound.js';
import v1Routes from './app/routes/v1/index.js';
export default function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use('/api/v1', v1Routes);
  app.use(notFound);
  return app;
}
