export type WasteCategory =
  | 'Rác tái chế'
  | 'Rác hữu cơ'
  | 'Rác nguy hại'
  | 'Rác vô cơ / Rác còn lại';

export interface WasteObject {
  name: string;
  locationInImage: string;
  category: WasteCategory;
  material: string;
  recyclable: boolean;
  recyclabilityScore: number; // 0 - 100%
  environmentalImpact: 'Rất cao' | 'Cao' | 'Trung bình' | 'Thấp';
  decompositionTime: string;
  binType: string; // e.g., 'Thùng Vàng (Tái chế)', 'Thùng Xanh Lá (Hữu cơ)', ...
  disposalSteps: string[];
  upcyclingIdea?: string;
  safetyWarning?: string;
}

export interface AnalysisResult {
  hasDetectableObjects: boolean;
  messageIfEmpty?: string;
  summary: string;
  totalObjectsCount: number;
  overallEcoScore: number; // 0 - 100
  items: WasteObject[];
  analyzedAt: string;
}

export interface AnalyzeRequestBody {
  imageBase64: string;
  mimeType?: string;
}

export interface ApiResponse<T = AnalysisResult> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: string;
  };
}
