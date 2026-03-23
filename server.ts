import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  // API Route for Feedback
  app.post('/api/feedback', async (req, res) => {
    const { type, content, name } = req.body;
    const targetEmail = 'prasanna.colan@gmail.com';

    // Configure Nodemailer
    // Note: User needs to provide EMAIL_USER and EMAIL_PASS in secrets
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || targetEmail,
      to: targetEmail,
      subject: `Portfolio Feedback: ${type}`,
      text: `
        New interaction on your portfolio!
        
        Type: ${type}
        ${content ? `Message: ${content}` : ''}
        
        Sent from your Portfolio App.
      `,
    };

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email credentials missing. Logging feedback to console instead.');
        console.log('Feedback Received:', mailOptions);
        return res.status(200).json({ 
          success: true, 
          message: 'Feedback logged (Email credentials not configured yet)' 
        });
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Feedback sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send feedback' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
