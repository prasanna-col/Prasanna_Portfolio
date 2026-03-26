import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { feedbackRouter } from './routes/feedback.ts';

export function createExpressApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', feedbackRouter());
  return app;
}
