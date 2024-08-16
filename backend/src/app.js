import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import router from './app/routes/v1';
export default function createApp() {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use('/api/v1', router);
  return app;
}
