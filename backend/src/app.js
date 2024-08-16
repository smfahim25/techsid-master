import express from 'express';
import helmet from 'helmet';
export default function createApp(){
  const app = express();
  app.use(cors())
  app.use(helmet())
  return app;
}
