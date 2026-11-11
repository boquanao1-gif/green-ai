import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { analyzeWasteImage } from './src/server/geminiService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Middleware to support base64 image payloads up to 20MB
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'GREEN AI Backend',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Next.js & Express unified API Route: POST /api/analyze
  app.post('/api/analyze', async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body || {};

      if (!imageBase64 || typeof imageBase64 !== 'string') {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_IMAGE',
            message: 'Vui lòng cung cấp dữ liệu hình ảnh (imageBase64).',
          },
        });
        return;
      }

      const result = await analyzeWasteImage(imageBase64, mimeType || 'image/jpeg');

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      const err = error as Error;
      const message = err.message || 'Lỗi không xác định khi phân tích ảnh.';

      let statusCode = 500;
      let code = 'INTERNAL_SERVER_ERROR';

      if (message.startsWith('MISSING_API_KEY')) {
        code = 'MISSING_API_KEY';
        statusCode = 500;
      } else if (message.startsWith('INVALID_IMAGE')) {
        code = 'INVALID_IMAGE';
        statusCode = 400;
      } else if (message.startsWith('IMAGE_TOO_LARGE')) {
        code = 'IMAGE_TOO_LARGE';
        statusCode = 413;
      } else if (message.startsWith('AUTH_ERROR')) {
        code = 'AUTH_ERROR';
        statusCode = 401;
      } else if (message.startsWith('QUOTA_EXCEEDED')) {
        code = 'QUOTA_EXCEEDED';
        statusCode = 429;
      }

      res.status(statusCode).json({
        success: false,
        error: {
          code,
          message,
        },
      });
    }
  });

  // Serve Vite in development or static dist in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[GREEN AI] Server running on http://0.0.0.0:${port}`);
    console.log(`[GREEN AI] API ready at POST /api/analyze`);
  });
}

startServer().catch((err) => {
  console.error('[GREEN AI] Failed to start server:', err);
  process.exit(1);
});
