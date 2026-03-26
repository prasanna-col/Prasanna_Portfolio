import nodemailer from 'nodemailer';

export function normalizeGmailCredentials() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, '').trim();
  return { user, pass };
}

export function createGmailTransport(user: string, pass: string) {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export const GMAIL_APP_PASSWORD_HELP =
  'Use a Gmail App Password: Google Account → Security → 2-Step Verification → App passwords. Put the 16-character password in EMAIL_PASS (not your normal Gmail password).';
