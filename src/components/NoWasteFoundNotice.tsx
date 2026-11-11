import React from 'react';
import { HelpCircle, Camera, CheckCircle, RefreshCw } from 'lucide-react';

interface NoWasteFoundNoticeProps {
  message?: string;
  onReset: () => void;
}

export const NoWasteFoundNotice: React.FC<NoWasteFoundNoticeProps> = ({ message, onReset }) => {
  return (
    <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 text-center shadow-xs max-w-2xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
        <HelpCircle className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Không Nhận Diện Thấy Vật Thể Rác Thải
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
        {message ||
          'AI đã quét kỹ hình ảnh nhưng không phát hiện thấy rác thải, bao bì hoặc vật dụng nào cần phân loại theo quy chuẩn môi trường.'}
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs text-slate-600 mb-6 space-y-2">
        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Mẹo để AI nhận diện chuẩn xác nhất:
        </h4>
        <ul className="space-y-1.5 pl-1">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Chụp rõ nét các vật thể rác thải, tránh ảnh bị rung nhòe hoặc quá tối.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Tránh tải ảnh chân dung người, phong cảnh xa xôi hoặc màn hình máy tính.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Bạn có thể đặt nhiều loại rác cùng một chỗ (hộp xốp, chai nhựa, thức ăn, pin) để AI phân loại từng món.</span>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Thử lại với bức ảnh khác</span>
      </button>
    </div>
  );
};
