import { GoogleGenAI, Type } from '@google/genai';
import type { AnalysisResult } from '../types/green.js';

/**
 * Server-side Gemini service for GREEN AI.
 * IMPORTANT: This runs exclusively on the server (Node.js / Next.js serverless).
 * It reads process.env.GEMINI_API_KEY directly and never exposes keys or SDK to the browser.
 */
export async function analyzeWasteImage(
  imageBase64: string,
  mimeType: string = 'image/jpeg'
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error(
      'MISSING_API_KEY: Chưa cấu hình GEMINI_API_KEY trong biến môi trường của máy chủ. Vui lòng thiết lập GEMINI_API_KEY trong file .env hoặc cấu hình Vercel Environment Variables.'
    );
  }

  // Sanitize base64 data: remove data URL prefix if present
  let cleanBase64 = imageBase64;
  if (cleanBase64.includes('base64,')) {
    const parts = cleanBase64.split('base64,');
    cleanBase64 = parts[1];
    // Also auto-detect mime type if present in data URL
    const match = parts[0].match(/data:([^;]+);/);
    if (match && match[1]) {
      mimeType = match[1];
    }
  }

  // Clean any remaining whitespaces
  cleanBase64 = cleanBase64.trim().replace(/\s/g, '');

  if (!cleanBase64) {
    throw new Error('INVALID_IMAGE: Dữ liệu hình ảnh trống hoặc không hợp lệ.');
  }

  // Rough size check: base64 string length / 1.33 gives approx bytes
  const approxSizeBytes = cleanBase64.length * 0.75;
  if (approxSizeBytes > 15 * 1024 * 1024) {
    throw new Error('IMAGE_TOO_LARGE: Dung lượng ảnh vượt quá giới hạn 15MB. Vui lòng chọn ảnh nhỏ hơn.');
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const prompt = `Hãy quan sát kỹ lưỡng toàn bộ bức ảnh và nhận diện TẤT CẢ các vật thể rác thải, bao bì, phế phẩm hoặc đồ vật có thể phân loại/tái chế.

Yêu cầu phân tích:
1. Phân tách rành mạch từng vật thể độc lập (ví dụ nếu có 1 chai nhựa, 1 nắp chai, 1 túi nilon, 1 vỏ chuối, hãy tách thành 4 mục riêng biệt).
2. Xác định vị trí tương đối của từng vật thể trong ảnh để người dùng dễ đối chiếu.
3. Phân loại chuẩn xác vào 1 trong 4 nhóm:
   - "Rác tái chế" (nhựa PET/HDPE, giấy bìa carton, nhôm, kim loại, thủy tinh lành)
   - "Rác hữu cơ" (thức ăn thừa, vỏ củ quả, bã trà/cà phê, lá cây, hoa tươi)
   - "Rác nguy hại" (pin, ắc quy, bóng đèn compact/huỳnh quang, lọ sơn, bình xịt nén, rác điện tử)
   - "Rác vô cơ / Rác còn lại" (hộp xốp dầu mỡ, tã bỉm, giấy lau bẩn, gốm sứ vỡ, túi nilon khó phân hủy)
4. Hướng dẫn chi tiết các bước xử lý (ví dụ: tráng sạch thức ăn, bóc nhãn nylon, tháo nắp, làm bẹp, phân loại vào thùng nào).
5. Đưa ra ý tưởng tái chế (upcycling) sáng tạo nếu khả thi.
6. Cảnh báo an toàn nếu vật thể có nguy cơ gây độc, nổ hoặc thương tích.
7. Nếu trong ảnh hoàn toàn không có đồ vật hoặc rác thải nào để phân loại (ảnh người, phong cảnh thiên nhiên không rác, ảnh mờ đen), hãy đặt hasDetectableObjects = false và giải thích lý do cụ thể trong messageIfEmpty.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        systemInstruction:
          'Bạn là chuyên gia AI hàng đầu về phân loại rác thải, xử lý môi trường và kinh tế tuần hoàn theo quy chuẩn phân loại rác tại nguồn của Việt Nam (Luật Bảo vệ Môi trường). Hãy luôn phản hồi khách quan, chuẩn xác và 100% bằng tiếng Việt.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasDetectableObjects: {
              type: Type.BOOLEAN,
              description: 'True nếu phát hiện được vật thể trong ảnh, False nếu ảnh không có vật thể phù hợp',
            },
            messageIfEmpty: {
              type: Type.STRING,
              description: 'Thông báo thân thiện bằng tiếng Việt nếu không tìm thấy rác thải/vật thể nào',
            },
            summary: {
              type: Type.STRING,
              description: 'Tóm tắt tổng quan ngắn gọn về các loại rác thải tìm thấy',
            },
            totalObjectsCount: {
              type: Type.INTEGER,
              description: 'Tổng số vật thể nhận diện được',
            },
            overallEcoScore: {
              type: Type.INTEGER,
              description: 'Điểm sinh thái tổng thể từ 0 đến 100',
            },
            items: {
              type: Type.ARRAY,
              description: 'Danh sách chi tiết từng vật thể phân tích',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: 'Tên vật thể cụ thể bằng tiếng Việt',
                  },
                  locationInImage: {
                    type: Type.STRING,
                    description: 'Vị trí vật thể trong ảnh (ví dụ: Giữa ảnh, Bên trái, Góc dưới bên phải)',
                  },
                  category: {
                    type: Type.STRING,
                    description: 'Phân loại: Rác tái chế | Rác hữu cơ | Rác nguy hại | Rác vô cơ / Rác còn lại',
                  },
                  material: {
                    type: Type.STRING,
                    description: 'Chất liệu chính cấu thành vật thể',
                  },
                  recyclable: {
                    type: Type.BOOLEAN,
                    description: 'Có thể tái chế được hay không',
                  },
                  recyclabilityScore: {
                    type: Type.INTEGER,
                    description: 'Tỷ lệ/điểm tái chế từ 0 đến 100',
                  },
                  environmentalImpact: {
                    type: Type.STRING,
                    description: 'Mức độ tác động: Rất cao | Cao | Trung bình | Thấp',
                  },
                  decompositionTime: {
                    type: Type.STRING,
                    description: 'Thời gian phân hủy tự nhiên trong điều kiện thường',
                  },
                  binType: {
                    type: Type.STRING,
                    description: 'Màu sắc và loại thùng rác quy chuẩn',
                  },
                  disposalSteps: {
                    type: Type.ARRAY,
                    description: 'Các bước xử lý và phân loại cụ thể',
                    items: {
                      type: Type.STRING,
                    },
                  },
                  upcyclingIdea: {
                    type: Type.STRING,
                    description: 'Ý tưởng tái chế/tái sử dụng sáng tạo nếu có',
                  },
                  safetyWarning: {
                    type: Type.STRING,
                    description: 'Cảnh báo an toàn nếu độc hại, dễ cháy, sắc nhọn',
                  },
                },
                required: [
                  'name',
                  'locationInImage',
                  'category',
                  'material',
                  'recyclable',
                  'recyclabilityScore',
                  'environmentalImpact',
                  'decompositionTime',
                  'binType',
                  'disposalSteps',
                ],
              },
            },
          },
          required: ['hasDetectableObjects', 'summary', 'totalObjectsCount', 'items'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('EMPTY_RESPONSE: AI không trả về phản hồi văn bản. Vui lòng thử lại với hình ảnh khác.');
    }

    const parsed = JSON.parse(text);

    return {
      hasDetectableObjects: Boolean(parsed.hasDetectableObjects),
      messageIfEmpty: parsed.messageIfEmpty || 'Không tìm thấy vật thể rác thải nào cần phân loại trong hình ảnh.',
      summary: parsed.summary || 'Đã hoàn tất phân tích hình ảnh.',
      totalObjectsCount: Number(parsed.totalObjectsCount || (parsed.items ? parsed.items.length : 0)),
      overallEcoScore: Math.min(100, Math.max(0, Number(parsed.overallEcoScore || 50))),
      items: Array.isArray(parsed.items) ? parsed.items : [],
      analyzedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const error = err as Error;
    const msg = error.message || String(error);

    if (msg.includes('API_KEY_INVALID') || msg.includes('403') || msg.includes('PERMISSION_DENIED')) {
      throw new Error(
        'AUTH_ERROR: Khóa API Gemini không hợp lệ hoặc không có quyền truy cập. Vui lòng kiểm tra lại GEMINI_API_KEY.'
      );
    }
    if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
      throw new Error(
        'QUOTA_EXCEEDED: Hạn mức gọi Gemini API tạm thời vượt quá. Vui lòng đợi vài giây và thử lại.'
      );
    }
    if (msg.includes('FetchError') || msg.includes('ENOTFOUND') || msg.includes('ETIMEDOUT')) {
      throw new Error('NETWORK_ERROR: Không thể kết nối đến máy chủ Gemini AI. Vui lòng kiểm tra kết nối mạng.');
    }

    throw new Error(`ANALYSIS_FAILED: ${msg}`);
  }
}
