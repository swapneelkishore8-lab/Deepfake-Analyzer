import axios, { AxiosInstance } from 'axios';
import { AnalysisResult, HealthCheck, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 120000, // 2 minutes for large file uploads
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async checkHealth(): Promise<ApiResponse<HealthCheck>> {
    try {
      const response = await this.client.get<HealthCheck>('/api/v1/health');
      return { data: response.data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Health check failed',
      };
    }
  }

  async analyzeMedia(file: File): Promise<ApiResponse<AnalysisResult>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post<AnalysisResult>(
        '/api/v1/analyze',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: error.response?.data?.detail || error.message,
        };
      }
      return {
        error: error instanceof Error ? error.message : 'Analysis failed',
      };
    }
  }

  async getAnalysis(analysisId: string): Promise<ApiResponse<AnalysisResult>> {
    try {
      const response = await this.client.get<AnalysisResult>(
        `/api/v1/analysis/${analysisId}`
      );
      return { data: response.data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to get analysis',
      };
    }
  }
}

export const apiService = new ApiService();
export default apiService;

