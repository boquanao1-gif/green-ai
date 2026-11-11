/**
 * Next.js App Router API Route Handler
 * Endpoint: POST /api/analyze
 * Compatible with Vercel Serverless Functions / Node.js runtime.
 * Uses Web Standard Request and Response (built into Next.js 13/14/15).
 */
import { analyzeWasteImage } from '@/src/server/geminiService.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60s timeout for AI vision reasoning on Vercel

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return Response.json(
        {
          success: false,
          error: {
            code: 'INVALID_CONTENT_TYPE',
            message: 'Yêu cầu không hợp lệ: Content-Type phải là application/json.',
          },
        },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return Response.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'Dữ liệu gửi lên không hợp lệ hoặc rỗng.',
          },
        },
        { status: 400 }
      );
    }

    const { imageBase64, mimeType } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return Response.json(
        {
          success: false,
          error: {
            code: 'MISSING_IMAGE',
            message: 'Vui lòng cung cấp dữ liệu hình ảnh (imageBase64).',
          },
        },
        { status: 400 }
      );
    }

    // Call server-side Gemini service
    const result = await analyzeWasteImage(imageBase64, mimeType || 'image/jpeg');

    return Response.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    const message = err.message || 'Lỗi không xác định khi xử lý trên máy chủ.';

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

    return Response.json(
      {
        success: false,
        error: {
          code,
          message,
        },
      },
      { status: statusCode }
    );
  }
}
