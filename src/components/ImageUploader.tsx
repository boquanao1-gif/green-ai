import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { SAMPLE_IMAGES, SampleImage } from '../data/sampleImages.js';

interface ImageUploaderProps {
  onImageSelected: (base64Data: string, mimeType: string, fileName?: string) => void;
  selectedPreview: string | null;
  selectedFileName?: string | null;
  onClear: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  selectedPreview,
  selectedFileName,
  onClear,
  onAnalyze,
  isLoading,
  disabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processFile = (file: File) => {
    setUploadError(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('Tệp tải lên không phải là hình ảnh. Vui lòng chọn tệp JPG, PNG, WEBP hoặc HEIC.');
      return;
    }

    // Validate size (15MB max)
    const maxSizeBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError(
        `Kích thước ảnh (${(file.size / (1024 * 1024)).toFixed(1)}MB) quá lớn. Giới hạn tối đa là 15MB để đảm bảo tốc độ truyền tải.`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result, file.type, file.name);
      }
    };
    reader.onerror = () => {
      setUploadError('Đã xảy ra lỗi khi đọc tệp ảnh. Vui lòng thử lại.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled && !isLoading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const selectSample = (sample: SampleImage) => {
    setUploadError(null);
    onImageSelected(sample.dataUrl, 'image/svg+xml', `Ảnh mẫu: ${sample.title}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-5 rounded-full bg-emerald-600 inline-block"></span>
            Tải Ảnh Rác Thải Cần Phân Tích
          </h2>
          <p className="text-xs text-slate-500">
            Hỗ trợ phân tích nhiều vật thể rác đồng thời trong một bức ảnh
          </p>
        </div>

        {selectedPreview && !isLoading && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Chọn ảnh khác</span>
          </button>
        )}
      </div>

      {uploadError && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Dropzone or Image Preview */}
      {!selectedPreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-emerald-400 bg-slate-50/50'
          }`}
        >
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-slate-800 text-base mb-1">
              Kéo thả hình ảnh vào đây hoặc bấm để chọn tệp
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Hỗ trợ định dạng JPG, PNG, WEBP, HEIC (Tối đa 15MB). Bạn có thể chụp toàn bộ bàn ăn, góc làm việc hoặc khu vực tập kết rác.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Chọn ảnh từ thiết bị</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Chụp ảnh trực tiếp</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center max-h-[440px]">
            <img
              src={selectedPreview}
              alt="Xem trước ảnh rác thải"
              className="w-full h-auto max-h-[440px] object-contain"
            />
            {selectedFileName && (
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 max-w-[90%] truncate">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{selectedFileName}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>AI sẽ quét và bóc tách từng vật thể độc lập trong hình ảnh này</span>
            </div>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${
                isLoading
                  ? 'bg-emerald-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20 active:scale-98'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Máy chủ đang phân tích...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Phân tích rác với Gemini AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Preset sample testing options */}
      {!selectedPreview && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Hoặc thử nhanh với ảnh mẫu đa vật thể:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => selectSample(sample)}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 mb-1 flex items-center justify-between">
                    <span>{sample.title}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      {sample.expectedObjects.length} vật thể
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {sample.description}
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span>Bấm để thử ngay</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
