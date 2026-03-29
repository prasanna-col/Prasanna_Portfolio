import { Router, type Request, type Response } from 'express';
import {
  parseFeedbackFromHttpBody,
  processFeedbackPost,
} from '../feedback/processFeedbackPost.ts';

export function feedbackRouter() {
  const router = Router();

  router.post('/feedback', async (req: Request, res: Response) => {
    const input = parseFeedbackFromHttpBody(req.body, req.get('user-agent'));
    const result = await processFeedbackPost(input);
    res.status(result.status).json(result.body);
  });

  return router;
}
