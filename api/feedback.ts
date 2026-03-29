/**
 * Vercel Serverless Function — handles POST /api/feedback.
 * Env vars come from Vercel Project Settings (not from a committed .env file).
 * @see https://vercel.com/docs/projects/environment-variables
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  parseFeedbackFromHttpBody,
  processFeedbackPost,
} from '../server/feedback/processFeedbackPost.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const body =
    typeof req.body === 'string' ? (JSON.parse(req.body) as unknown) : req.body;
  const ua = req.headers['user-agent'];
  const input = parseFeedbackFromHttpBody(body, typeof ua === 'string' ? ua : undefined);
  const result = await processFeedbackPost(input);
  return res.status(result.status).json(result.body);
}
