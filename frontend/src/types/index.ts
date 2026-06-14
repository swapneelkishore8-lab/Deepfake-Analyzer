// Analysis Types

export interface AnalysisResult {
  analysis_id: string;
  file_type: 'audio' | 'video';
  risk_score: number;
  risk_level: RiskLevel;
  indicators: Indicator[];
  explanation: string;
  recommendations: string[];
  timestamp: string;
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface Indicator {
  category: string;
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'none';
}

export interface AnalysisHistory {
  id: string;
  fileName: string;
  fileType: 'audio' | 'video';
  riskScore: number;
  riskLevel: RiskLevel;
  timestamp: string;
}

export interface UploadState {
  file: File | null;
  isUploading: boolean;
  progress: number;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface HealthCheck {
  status: string;
  service: string;
  version: string;
}

// Risk Level Configuration
export const RISK_CONFIG: Record<RiskLevel, { color: string; bgColor: string; label: string }> = {
  LOW: {
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    label: 'Low Risk'
  },
  MODERATE: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    label: 'Moderate Risk'
  },
  HIGH: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    label: 'High Risk'
  },
  CRITICAL: {
    color: 'text-red-600',
    bgColor: 'bg-red-600/30',
    label: 'Critical Risk'
  }
};

// File type configuration
export const ACCEPTED_FILE_TYPES = {
  audio: ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/m4a', 'audio/flac'],
  video: ['video/mp4', 'video/avi', 'video/mov', 'video/webm']
};

export const FILE_EXTENSIONS = {
  audio: '.wav,.mp3,.m4a,.flac',
  video: '.mp4,.avi,.mov,.webm'
};

