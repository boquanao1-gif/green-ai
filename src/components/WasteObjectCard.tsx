import React, { useState } from 'react';
import { WasteObject, WasteCategory } from '../types/green.js';
import {
  Trash2,
  RefreshCw,
  AlertTriangle,
  Apple,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';

interface WasteObjectCardProps {
  item: WasteObject;
  index: number;
}

export const WasteObjectCard: React.FC<WasteObjectCardProps> = ({ item, index }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepIdx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepIdx]: !prev[stepIdx],
    }));
  };

  const getCategoryConfig = (cat: WasteCategory) => {
    switch (cat) {
      case 'Rác tái chế':
        return {
          icon: RefreshCw,
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
          binBadge: 'bg-amber-500 text-white',
          cardBorder: 'border-amber-200/80 hover:border-amber-400',
          accentColor: 'text-amber-600',
        };
      case 'Rác hữu cơ':
        return {
          icon: Apple,
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          binBadge: 'bg-emerald-600 text-white',
          cardBorder: 'border-emerald-200/80 hover:border-emerald-400',
          accentColor: 'text-emerald-600',
        };
      case 'Rác nguy hại':
        return {
          icon: AlertTriangle,
          badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
          binBadge: 'bg-rose-600 text-white',
          cardBorder: 'border-rose-200/80 hover:border-rose-400',
          accentColor: 'text-rose-600',
        };
      default:
        return {
          icon: Trash2,
          badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
          binBadge: 'bg-slate-700 text-white',
          cardBorder: 'border-slate-200/80 hover:border-slate-400',
          accentColor: 'text-slate-700',
        };
    }
  };

  const config = getCategoryConfig(item.category);
  const CategoryIcon = config.icon;

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'Rất cao':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Cao':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Trung bình':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all ${config.cardBorder}`}
    >
      {/* Header: Name, Number, Category */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
              #{index + 1}
            </span>
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">{item.name}</h4>
          </div>
          {item.locationInImage && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Vị trí: <strong>{item.locationInImage}</strong></span>
            </div>
          )}
        </div>

        {/* Category & Bin Badge */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.badgeColor}`}
          >
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{item.category}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-xs ${config.binBadge}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{item.binType}</span>
          </span>
        </div>
      </div>

      {/* Grid Specs: Material, Recyclability, Decomposition, Impact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-5">
        <div>
          <span className="text-[11px] text-slate-500 font-semibold block mb-0.5">Chất liệu:</span>
          <span className="text-xs font-bold text-slate-800">{item.material || 'Hỗn hợp'}</span>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 font-semibold block mb-0.5">Tỷ lệ tái chế:</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${item.recyclabilityScore}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold text-slate-800">{item.recyclabilityScore}%</span>
          </div>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 font-semibold block mb-0.5">Thời gian phân hủy:</span>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.decompositionTime}</span>
          </div>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 font-semibold block mb-0.5">Tác động môi trường:</span>
          <span
            className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getImpactBadge(
              item.environmentalImpact
            )}`}
          >
            {item.environmentalImpact}
          </span>
        </div>
      </div>

      {/* Step-by-step Disposal Guide */}
      <div className="space-y-3 mb-5">
        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Quy trình xử lý & phân loại chuẩn:</span>
        </h5>
        <div className="space-y-2">
          {item.disposalSteps.map((step, sIdx) => {
            const isDone = completedSteps[sIdx];
            return (
              <div
                key={sIdx}
                onClick={() => toggleStep(sIdx)}
                className={`p-2.5 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition-colors ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 line-through opacity-80'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-3 h-3" />}
                </div>
                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Warning (if present) */}
      {item.safetyWarning && item.safetyWarning.trim() !== '' && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-800">Cảnh báo an toàn: </span>
            <span>{item.safetyWarning}</span>
          </div>
        </div>
      )}

      {/* Upcycling Creative Idea (if present) */}
      {item.upcyclingIdea && item.upcyclingIdea.trim() !== '' && (
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-800">Ý tưởng tái chế (Upcycling): </span>
            <span>{item.upcyclingIdea}</span>
          </div>
        </div>
      )}
    </div>
  );
};
