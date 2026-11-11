import React from 'react';
import { AnalysisResult, WasteCategory } from '../types/green.js';
import { Leaf, Award, CheckCircle, Copy, Share2, Layers } from 'lucide-react';

interface AnalysisSummaryProps {
  result: AnalysisResult;
  selectedCategory: WasteCategory | 'ALL';
  onSelectCategory: (cat: WasteCategory | 'ALL') => void;
  onCopySummary: () => void;
  copied: boolean;
}

export const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({
  result,
  selectedCategory,
  onSelectCategory,
  onCopySummary,
  copied,
}) => {
  const { summary, totalObjectsCount, overallEcoScore, items } = result;

  // Count per category
  const counts: Record<string, number> = {
    'Rác tái chế': 0,
    'Rác hữu cơ': 0,
    'Rác nguy hại': 0,
    'Rác vô cơ / Rác còn lại': 0,
  };

  items.forEach((item) => {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  });

  const getEcoScoreBadge = (score: number) => {
    if (score >= 80) {
      return { text: 'Rất thân thiện môi trường', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (score >= 60) {
      return { text: 'Khả năng tái chế tốt', color: 'text-teal-700 bg-teal-50 border-teal-200' };
    }
    if (score >= 40) {
      return { text: 'Mức độ trung bình', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    }
    return { text: 'Nhiều rác khó phân hủy / Nguy hại', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const scoreBadge = getEcoScoreBadge(overallEcoScore);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Kết Quả Phân Tích Đa Vật Thể
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Đã phát hiện <span className="text-emerald-600">{totalObjectsCount} vật thể</span> trong hình ảnh
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Eco Score Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-xs">
          <div className="relative w-16 h-16 rounded-2xl bg-white border border-emerald-200 flex flex-col items-center justify-center shadow-xs">
            <span className="text-2xl font-black text-emerald-600 leading-none">{overallEcoScore}</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">/100</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Điểm Sinh Thái (Eco Score)</span>
            </div>
            <div className={`mt-1 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${scoreBadge.color}`}>
              {scoreBadge.text}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs by Category */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tất cả ({totalObjectsCount})</span>
          </button>

          {counts['Rác tái chế'] > 0 && (
            <button
              onClick={() => onSelectCategory('Rác tái chế')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'Rác tái chế'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span>Tái chế ({counts['Rác tái chế']})</span>
            </button>
          )}

          {counts['Rác hữu cơ'] > 0 && (
            <button
              onClick={() => onSelectCategory('Rác hữu cơ')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'Rác hữu cơ'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span>Hữu cơ ({counts['Rác hữu cơ']})</span>
            </button>
          )}

          {counts['Rác nguy hại'] > 0 && (
            <button
              onClick={() => onSelectCategory('Rác nguy hại')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'Rác nguy hại'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <span>Nguy hại ({counts['Rác nguy hại']})</span>
            </button>
          )}

          {counts['Rác vô cơ / Rác còn lại'] > 0 && (
            <button
              onClick={() => onSelectCategory('Rác vô cơ / Rác còn lại')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'Rác vô cơ / Rác còn lại'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <span>Rác còn lại ({counts['Rác vô cơ / Rác còn lại']})</span>
            </button>
          )}
        </div>

        {/* Copy / Export Button */}
        <button
          onClick={onCopySummary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition-colors self-start sm:self-auto"
        >
          {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Đã sao chép báo cáo' : 'Sao chép tóm tắt'}</span>
        </button>
      </div>
    </div>
  );
};
