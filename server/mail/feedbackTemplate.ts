export type FeedbackEmailInput = {
  type: string;
  content?: string;
  userAgent: string;
  receivedAtIso: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function typeLabel(type: string): string {
  const t = type.trim();
  if (t === 'Like') return '❤️ Like';
  if (t === 'Interest') return '⭐ Interested';
  if (t === 'Comment') return '💬 Comment';
  return t;
}

function typeAccentColor(type: string): string {
  const t = type.trim();
  if (t === 'Like') return '#f43f5e';
  if (t === 'Interest') return '#f59e0b';
  if (t === 'Comment') return '#10b981';
  return '#10b981';
}

export function buildFeedbackMail(input: FeedbackEmailInput) {
  const safeType = escapeHtml(input.type);
  const safeContent = input.content?.trim()
    ? escapeHtml(input.content.trim()).replace(/\n/g, '<br/>')
    : '';
  const safeUa = escapeHtml(input.userAgent || '(not provided)');
  const safeTime = escapeHtml(
    new Date(input.receivedAtIso).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }),
  );
  const accent = typeAccentColor(input.type);
  const label = typeLabel(input.type);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio feedback</title>
</head>
<body style="margin:0;padding:0;background-color:#0c0c0e;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0c0c0e;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse;background-color:#18181b;border-radius:16px;overflow:hidden;box-shadow:0 24px 48px rgba(0,0,0,0.45);border:1px solid #27272a;">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,${accent},#059669,#0d9488);"></td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#71717a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                Portfolio notification
              </p>
              <h1 style="margin:0;font-size:26px;font-weight:600;color:#fafafa;letter-spacing:-0.02em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                New interaction
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px 32px;">
              <span style="display:inline-block;padding:8px 14px;border-radius:999px;background-color:#27272a;color:${accent};font-size:13px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;border:1px solid ${accent};">
                ${escapeHtml(label)}
              </span>
            </td>
          </tr>
          ${
            safeContent
              ? `<tr>
            <td style="padding:12px 32px 8px 32px;">
              <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.08em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Message</p>
              <div style="margin:0;padding:16px 18px;background-color:#27272a;border-radius:12px;border:1px solid #3f3f46;color:#e4e4e7;font-size:15px;line-height:1.55;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                ${safeContent}
              </div>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding:20px 32px 8px 32px;">
              <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.08em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Visitor device hint</p>
              <div style="margin:0;padding:14px 16px;background-color:#09090b;border-radius:10px;border:1px solid #27272a;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:1.5;color:#a1a1aa;word-break:break-all;">
                ${safeUa}
              </div>
              <p style="margin:10px 0 0 0;font-size:11px;color:#52525b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.45;">
                Coarse browser/OS string from <code style="background:#27272a;padding:2px 6px;border-radius:4px;color:#d4d4d8;">navigator.userAgent</code> — can be incomplete or spoofed; not a unique identifier.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 28px 32px;">
              <p style="margin:0;font-size:12px;color:#52525b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                Received <strong style="color:#a1a1aa;font-weight:600;">${safeTime}</strong> · type: <strong style="color:#a1a1aa;">${safeType}</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px;border-top:1px solid #27272a;">
              <p style="margin:16px 0 0 0;font-size:11px;color:#3f3f46;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                Sent from your portfolio feedback form
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  const text = [
    'PORTFOLIO FEEDBACK',
    '==================',
    '',
    `Type: ${input.type}`,
    `Received: ${input.receivedAtIso}`,
    '',
    input.content?.trim() ? `Message:\n${input.content.trim()}\n` : '',
    'Visitor user-agent (coarse, may be spoofed):',
    input.userAgent || '(not provided)',
    '',
    '— Portfolio app',
  ]
    .filter(Boolean)
    .join('\n');

  return { html, text };
}
