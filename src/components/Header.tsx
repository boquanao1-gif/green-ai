import React from 'react';
import { Leaf, Info, CloudUpload, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenVercelModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide, onOpenVercelModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Leaf className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                GREEN <span className="text-emerald-600">AI</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Hệ thống AI phân loại rác & tái chế chuẩn Luật Bảo vệ Môi trường
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Xem quy chuẩn 4 loại thùng rác"
          >
            <Info className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Quy chuẩn thùng rác</span>
            <span className="md:hidden">Thùng rác</span>
          </button>

          <button
            onClick={onOpenVercelModal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            title="Hướng dẫn cấu hình và triển khai Vercel"
          >
            <CloudUpload className="w-4 h-4 text-teal-400" />
            <span>Triển khai Vercel</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Server API Route</span>
          </div>
        </div>
      </div>
    </header>
  );
};
