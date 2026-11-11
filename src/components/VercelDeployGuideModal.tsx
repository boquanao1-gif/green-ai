import React, { useState } from 'react';
import { X, Check, Copy, Terminal, ShieldCheck, Server, AlertCircle } from 'lucide-react';

interface VercelDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployGuideModal: React.FC<VercelDeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const envExample = `GEMINI_API_KEY="AIzaSyYourActualGeminiApiKeyHere"`;
  const vercelCliCmd = `npm i -g vercel\nvercel deploy --prod`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              ▲
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Hướng Dẫn Triển Khai Next.js Trên Vercel
              </h2>
              <p className="text-xs text-slate-500">
                Đầy đủ kiến trúc Next.js App Router & Server-Side Gemini API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Security Checklist */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Tuân thủ 100% tiêu chuẩn bảo mật Full-Stack:
            </h3>
            <ul className="text-xs text-slate-600 space-y-1.5 pl-2">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>API Route phía máy chủ:</strong> <code>/app/api/analyze/route.ts</code> (Next.js App Router POST handler)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Thư viện chính thức:</strong> <code>@google/genai</code> phiên bản mới nhất, gọi từ server-side.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Đọc biến môi trường an toàn:</strong> Sử dụng <code>process.env.GEMINI_API_KEY</code>, tuyệt đối không dùng <code>NEXT_PUBLIC_</code>.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Trình duyệt không thấy API key:</strong> Client chỉ gửi ảnh lên <code>/api/analyze</code>, máy chủ xác thực và phân tích.</span>
              </li>
            </ul>
          </div>

          {/* Step 1: Set GEMINI_API_KEY on Vercel */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              <h4 className="font-bold text-slate-900 text-sm">
                Cấu hình Biến Môi Trường trên Vercel Dashboard
              </h4>
            </div>
            <p className="text-xs text-slate-600 pl-8">
              Khi tạo Project trên Vercel hoặc trong phần <strong>Project Settings &gt; Environment Variables</strong>, hãy thêm biến sau:
            </p>
            <div className="ml-8 bg-slate-900 text-slate-100 rounded-lg p-3 text-xs font-mono flex items-center justify-between">
              <span>{envExample}</span>
              <button
                onClick={() => copyToClipboard(envExample, 'env')}
                className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded transition-colors"
              >
                {copiedKey === 'env' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'env' ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 ml-8 flex items-start gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span><strong>Lưu ý quan trọng:</strong> Tuyệt đối không đặt tên là <code>NEXT_PUBLIC_GEMINI_API_KEY</code> vì tiền tố <code>NEXT_PUBLIC_</code> sẽ làm lộ khóa bí mật vào mã nguồn trình duyệt!</span>
            </p>
          </div>

          {/* Step 2: Deploy methods */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              <h4 className="font-bold text-slate-900 text-sm">
                Cách Triển Khai Lên Vercel (2 Cách Đơn Giản)
              </h4>
            </div>
            <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="font-semibold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-teal-600" />
                  <span>Cách 1: Kết nối GitHub (Khuyên dùng)</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Đẩy mã nguồn lên kho lưu trữ GitHub của bạn, sau đó vào <strong>vercel.com &gt; Add New &gt; Project</strong> và chọn repository. Vercel sẽ tự động phát hiện cấu hình và build.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="font-semibold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-700" />
                  <span>Cách 2: Triển khai qua Vercel CLI</span>
                </div>
                <div className="bg-slate-900 text-slate-100 rounded p-2 text-[10px] font-mono flex items-center justify-between">
                  <pre>{vercelCliCmd}</pre>
                  <button
                    onClick={() => copyToClipboard(vercelCliCmd, 'cli')}
                    className="text-slate-300 hover:text-white"
                  >
                    {copiedKey === 'cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture overview */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Cấu Trúc Tệp Next.js Đã Chuẩn Bị Sẵn Trong Dự Án:
            </h4>
            <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-xs font-mono space-y-1">
              <div>📁 app/</div>
              <div>├── 📁 api/analyze/</div>
              <div>│   └── 📄 route.ts <span className="text-slate-400">// Next.js Serverless Route Handler</span></div>
              <div>├── 📄 page.tsx <span className="text-slate-400">// Next.js App Router Page</span></div>
              <div>├── 📄 layout.tsx <span className="text-slate-400">// Root Layout with SEO Meta</span></div>
              <div>├── 📄 globals.css <span className="text-slate-400">// Tailwind CSS</span></div>
              <div>📄 next.config.mjs <span className="text-slate-400">// Next.js Configuration</span></div>
              <div>📄 vercel.json <span className="text-slate-400">// Vercel Deploy & Serverless Configuration</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Đóng Hướng Dẫn
          </button>
        </div>
      </div>
    </div>
  );
};
