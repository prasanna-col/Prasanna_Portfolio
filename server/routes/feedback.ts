import { Router, type Request, type Response } from 'express';
import {
  normalizeGmailCredentials,
  createGmailTransport,
  GMAIL_APP_PASSWORD_HELP,
} from '../config/gmail.ts';
import { buildFeedbackMail } from '../mail/feedbackTemplate.ts';

const FEEDBACK_TO = 'prasanna.colan@gmail.com';

function parseFeedbackBody(req: Request) {
  const { type, content, userAgent: bodyUa } = req.body as {
    type?: string;
    content?: string;
    userAgent?: string;
  };
  const headerUa = req.get('user-agent') ?? '';
  const userAgent =
    typeof bodyUa === 'string' && bodyUa.trim() ? bodyUa.trim() : headerUa || '(not provided)';

  return {
    type: typeof type === 'string' ? type : 'Unknown',
    content: typeof content === 'string' ? content : undefined,
    userAgent,
  };
}

export function feedbackRouter() {
  const router = Router();

  router.post('/feedback', async (req: Request, res: Response) => {
    const { type, content, userAgent } = parseFeedbackBody(req);
    const { user: emailUser, pass: emailPass } = normalizeGmailCredentials();
    const receivedAtIso = new Date().toISOString();

    const { html, text } = buildFeedbackMail({
      type,
      content,
      userAgent,
      receivedAtIso,
    });

    const mailOptions = {
      from: emailUser || FEEDBACK_TO,
      to: FEEDBACK_TO,
      subject: `✨ Portfolio · ${type}`,
      text,
      html,
    };

    try {
      if (!emailUser || !emailPass) {
        console.warn('Email credentials missing. Logging feedback to console instead.');
        console.log('Feedback Received:', { type, content, userAgent, receivedAtIso });
        return res.status(200).json({
          success: true,
          message: 'Feedback logged (Email credentials not configured yet)',
        });
      }

      const transporter = createGmailTransport(emailUser, emailPass);
      await transporter.sendMail({
        ...mailOptions,
        from: emailUser,
      });
      res.status(200).json({ success: true, message: 'Feedback sent successfully' });
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      console.error('Error sending email:', error);
      if (err.code === 'EAUTH') {
        console.error(GMAIL_APP_PASSWORD_HELP);
        return res.status(500).json({
          success: false,
          message: 'Gmail rejected the login. Use an App Password for EMAIL_PASS.',
          hint: GMAIL_APP_PASSWORD_HELP,
        });
      }
      res.status(500).json({ success: false, message: 'Failed to send feedback' });
    }
  });

  return router;
}
