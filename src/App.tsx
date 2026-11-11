/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { Header } from './components/Header.js';
import { ImageUploader } from './components/ImageUploader.js';
import { AnalysisSummary } from './components/AnalysisSummary.js';
import { WasteObjectCard } from './components/WasteObjectCard.js';
import { NoWasteFoundNotice } from './components/NoWasteFoundNotice.js';
import { ErrorAlert } from './components/ErrorAlert.js';
import { WasteBinGuideModal } from './components/WasteBinGuideModal.js';
import { VercelDeployGuideModal } from './components/VercelDeployGuideModal.js';
import { AnalysisResult, ApiResponse, WasteCategory } from './types/green.js';
import { Sparkles, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [selectedBase64, setSelectedBase64] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>('image/jpeg');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ code?: string; message: string; details?: string } | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | 'ALL'>('ALL');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Modals
  const [showBinGuideModal, setShowBinGuideModal] = useState(false);
  const [showVercelModal, setShowVercelModal] = useState(false);

  const handleImageSelected = (base64Data: string, mimeType: string, fileName?: string) => {
    setSelectedPreview(base64Data);
    setSelectedBase64(base64Data);
    setSelectedMimeType(mimeType);
    setSelectedFileName(fileName || null);
    setError(null);
    setResult(null);
    setSelectedCategory('ALL');
  };

  const handleClear = () => {
    setSelectedPreview(null);
    setSelectedBase64(null);
    setSelectedFileName(null);
    setError(null);
    setResult(null);
    setSelectedCategory('ALL');
  };

  const handleAnalyze = async () => {
    if (!selectedBase64) {
      setError({
        code: 'MISSING_IMAGE',
        message: 'Vui lòng chọn hoặc chụp một bức ảnh trước khi phân tích.',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Direct call to Next.js / Express Server-Side API Route
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedBase64,
          mimeType: selectedMimeType,
        }),
      });

      const json: ApiResponse<AnalysisResult> = await response.json();

      if (!response.ok || !json.success || !json.data) {
        throw new Error(
          json.error?.message ||
            `Lỗi máy chủ HTTP ${response.status}: Không thể hoàn tất phân tích hình ảnh.`
        );
      }

      setResult(json.data);
    } catch (err: unknown) {
      const e = err as Error;
      let code = 'NETWORK_ERROR';
      let message = e.message || 'Không thể kết nối đến máy chủ API. Vui lòng kiểm tra lại kết nối mạng.';

      if (message.includes('GEMINI_API_KEY') || message.includes('MISSING_API_KEY')) {
        code = 'MISSING_API_KEY';
      } else if (message.includes('AUTH_ERROR')) {
        code = 'AUTH_ERROR';
      } else if (message.includes('QUOTA_EXCEEDED')) {
        code = 'QUOTA_EXCEEDED';
      } else if (message.includes('IMAGE_TOO_LARGE')) {
        code = 'IMAGE_TOO_LARGE';
      }

      setError({
        code,
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySummary = () => {
    if (!result) return;
    const lines = [
      `🌱 BÁO CÁO PHÂN LOẠI RÁC - GREEN AI`,
      `📅 Thời gian: ${new Date(result.analyzedAt).toLocaleString('vi-VN')}`,
      `📊 Tổng số vật thể: ${result.totalObjectsCount}`,
      `🌟 Điểm sinh thái: ${result.overallEcoScore}/100`,
      `📝 Tóm tắt: ${result.summary}`,
      `---------------------------------`,
      ...result.items.map(
        (it, idx) =>
          `#${idx + 1} ${it.name} | ${it.category} | ${it.binType} | Tái chế: ${it.recyclabilityScore}% | Phân hủy: ${it.decompositionTime}`
      ),
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Filter items if a specific category is selected
  const displayedItems = result?.items
    ? selectedCategory === 'ALL'
      ? result.items
      : result.items.filter((item) => item.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Header */}
      <Header
        onOpenGuide={() => setShowBinGuideModal(true)}
        onOpenVercelModal={() => setShowVercelModal(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-tight">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trợ Lý Môi Trường Thông Minh</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Phân Loại Rác Thông Minh Bằng <span className="text-emerald-600">GREEN AI</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Chụp hoặc tải ảnh chứa nhiều đồ vật rác thải. AI sẽ tự động phát hiện, phân tách từng vật thể, hướng dẫn phân loại chuẩn xác theo 4 nhóm rác và gợi ý cách tái chế sáng tạo.
          </p>
        </div>

        {/* Upload Zone */}
        <ImageUploader
          onImageSelected={handleImageSelected}
          selectedPreview={selectedPreview}
          selectedFileName={selectedFileName}
          onClear={handleClear}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {/* Error Alert View */}
        {error && (
          <ErrorAlert
            error={error}
            onRetry={handleAnalyze}
            onOpenVercelGuide={() => setShowVercelModal(true)}
          />
        )}

        {/* Result View */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {!result.hasDetectableObjects ? (
              <NoWasteFoundNotice
                message={result.messageIfEmpty}
                onReset={handleClear}
              />
            ) : (
              <>
                {/* Summary & Eco Score */}
                <AnalysisSummary
                  result={result}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onCopySummary={handleCopySummary}
                  copied={copiedSummary}
                />

                {/* Individual Object Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <span>Chi tiết phân loại từng vật thể</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {displayedItems.length} mục
                      </span>
                    </h3>
                  </div>

                  {displayedItems.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
                      Không có vật thể nào thuộc nhóm "{selectedCategory}". Hãy chọn "Tất cả" để xem toàn bộ danh sách.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {displayedItems.map((item, index) => (
                        <WasteObjectCard
                          key={`${item.name}-${index}`}
                          item={item}
                          index={index}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Educational Footer Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-bold text-lg text-white">Chung tay xây dựng lối sống xanh & bền vững</h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Phân loại rác tại nguồn là trách nhiệm và quyền lợi của mỗi công dân. Hãy cùng GREEN AI biến rác thải thành tài nguyên quý giá cho đất nước.
            </p>
          </div>
          <button
            onClick={() => setShowBinGuideModal(true)}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm shrink-0 shadow-xs transition-colors"
          >
            Tra cứu quy chuẩn thùng rác
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">GREEN AI</span>
            <span>•</span>
            <span>Phát triển trên nền tảng Next.js + Google Gemini AI</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <button
              onClick={() => setShowVercelModal(true)}
              className="hover:text-emerald-700 transition-colors underline"
            >
              Cấu hình Vercel
            </button>
            <button
              onClick={() => setShowBinGuideModal(true)}
              className="hover:text-emerald-700 transition-colors underline"
            >
              Quy chuẩn 4 màu thùng rác
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WasteBinGuideModal
        isOpen={showBinGuideModal}
        onClose={() => setShowBinGuideModal(false)}
      />

      <VercelDeployGuideModal
        isOpen={showVercelModal}
        onClose={() => setShowVercelModal(false)}
      />
    </div>
  );
}
