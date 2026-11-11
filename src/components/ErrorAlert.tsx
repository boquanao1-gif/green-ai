import React from 'react';
import { AlertCircle, RefreshCw, Key, WifiOff, FileWarning } from 'lucide-react';

interface ErrorAlertProps {
  error: {
    code?: string;
    message: string;
    details?: string;
  };
  onRetry: () => void;
  onOpenVercelGuide?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onRetry, onOpenVercelGuide }) => {
  const isKeyError =
    error.code === 'MISSING_API_KEY' ||
    error.code === 'AUTH_ERROR' ||
    error.message.includes('API_KEY');

  const isNetworkError =
    error.code === 'NETWORK_ERROR' || error.message.toLowerCase().includes('kết nối mạng');

  const isQuotaError =
    error.code === 'QUOTA_EXCEEDED' || error.message.toLowerCase().includes('hạn mức');

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 sm:p-7 shadow-xs max-w-2xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          {isKeyError ? (
            <Key className="w-6 h-6" />
          ) : isNetworkError ? (
            <WifiOff className="w-6 h-6" />
          ) : (
            <AlertCircle className="w-6 h-6" />
          )}
        </div>

        <div className="space-y-3 flex-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
              Lỗi xử lý [{error.code || 'ERROR'}]
            </span>
            <h3 className="text-base font-bold text-rose-950 mt-1">
              {isKeyError
                ? 'Chưa cấu hình hoặc khóa API Gemini không hợp lệ'
                : isQuotaError
                ? 'Hạn mức API tạm thời vượt quá'
                : 'Đã xảy ra lỗi khi phân tích hình ảnh'}
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
              {error.message}
            </p>
          </div>

          {/* Actionable guidance */}
          {isKeyError && (
            <div className="bg-white/80 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 space-y-1.5">
              <span className="font-bold">Cách khắc phục nhanh:</span>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>
                  <strong>Trên máy chủ nội bộ / AI Studio:</strong> Kiểm tra file <code>.env</code> có chứa dòng <code>GEMINI_API_KEY=...</code> chưa.
                </li>
                <li>
                  <strong>Trên Vercel:</strong> Vào <strong>Project Settings &gt; Environment Variables</strong>, tạo biến tên <code>GEMINI_API_KEY</code> với giá trị là API key của bạn, sau đó Redeploy.
                </li>
              </ul>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Thử lại</span>
            </button>

            {isKeyError && onOpenVercelGuide && (
              <button
                onClick={onOpenVercelGuide}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm transition-colors"
              >
                <span>Xem hướng dẫn biến môi trường</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
