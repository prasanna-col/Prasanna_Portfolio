export type FeedbackPayload = {
  type: string;
  content: string;
  userAgent: string;
};

export async function postFeedback(payload: FeedbackPayload): Promise<Response> {
  return fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function getClientUserAgent(): string {
  return typeof navigator !== 'undefined' ? navigator.userAgent : '';
}

export async function readFeedbackErrorMessage(response: Response): Promise<string> {
  const data = await response.json().catch(() => ({}));
  return typeof (data as { message?: string }).message === 'string'
    ? (data as { message: string }).message
    : 'Failed to send';
}
