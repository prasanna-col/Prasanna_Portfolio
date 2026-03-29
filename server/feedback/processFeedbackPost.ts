import {
  normalizeGmailCredentials,
  createGmailTransport,
  GMAIL_APP_PASSWORD_HELP,
} from '../config/gmail.ts';
import { buildFeedbackMail } from '../mail/feedbackTemplate.ts';

const FEEDBACK_TO = 'prasanna.colan@gmail.com';

export type FeedbackInput = {
  type: string;
  content?: string;
  userAgent: string;
};

export type FeedbackResult =
  | { status: 200; body: Record<string, unknown> }
  | { status: 500; body: Record<string, unknown> };

/**
 * Shared by Express and Vercel serverless. Reads `EMAIL_USER` / `EMAIL_PASS` from `process.env`
 * (local `.env` via dotenv, or Vercel Project Settings → Environment Variables).
 */
export async function processFeedbackPost(input: FeedbackInput): Promise<FeedbackResult> {
  const { type, content, userAgent } = input;
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
      return {
        status: 200,
        body: {
          success: true,
          message: 'Feedback logged (Email credentials not configured yet)',
        },
      };
    }

    const transporter = createGmailTransport(emailUser, emailPass);
    await transporter.sendMail({
      ...mailOptions,
      from: emailUser,
    });
    return {
      status: 200,
      body: { success: true, message: 'Feedback sent successfully' },
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    console.error('Error sending email:', error);
    if (err.code === 'EAUTH') {
      console.error(GMAIL_APP_PASSWORD_HELP);
      return {
        status: 500,
        body: {
          success: false,
          message: 'Gmail rejected the login. Use an App Password for EMAIL_PASS.',
          hint: GMAIL_APP_PASSWORD_HELP,
        },
      };
    }
    return {
      status: 500,
      body: { success: false, message: 'Failed to send feedback' },
    };
  }
}

export function parseFeedbackFromHttpBody(
  body: unknown,
  headerUserAgent: string | undefined,
): FeedbackInput {
  const b = body as { type?: string; content?: string; userAgent?: string };
  const bodyUa = b.userAgent;
  const userAgent =
    typeof bodyUa === 'string' && bodyUa.trim()
      ? bodyUa.trim()
      : headerUserAgent?.trim() || '(not provided)';

  return {
    type: typeof b.type === 'string' ? b.type : 'Unknown',
    content: typeof b.content === 'string' ? b.content : undefined,
    userAgent,
  };
}
