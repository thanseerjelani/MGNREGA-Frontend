import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API Types
export interface State {
  id: number;
  name: string;
  stateCode: string;
}

export interface District {
  id: number;
  name: string;
  districtCode: string;
  stateId: number;
  stateName: string;
}

export interface Performance {
  id: number;
  districtId: number;
  districtName: string;
  monthName: string;
  finYear: string;
  totalHouseholdsWorked: number;
  averageDaysEmployment: number;
  totalWages: number;
  ongoingWorks: number;
  completedWorks: number;
  totalExpenditure: number;
  avgWageRate: number;
  lastUpdated: string;
  performanceLevel: 'ABOVE_AVERAGE' | 'MODERATE' | 'BELOW_AVERAGE';
}

export interface ComparisonMetrics {
  householdsChange: number;
  daysWorkedChange: number;
  wagesChange: number;
  projectsChange: number;
}

export interface Comparison {
  current: Performance;
  previous: Performance | null;
  comparison: ComparisonMetrics | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// API Functions
export const api = {
  // Get all states
  getStates: async (): Promise<State[]> => {
    const response = await apiClient.get<ApiResponse<State[]>>('/states');
    return response.data.data;
  },

  // Get districts by state
  getDistricts: async (stateId: number): Promise<District[]> => {
    const response = await apiClient.get<ApiResponse<District[]>>(`/districts/${stateId}`);
    return response.data.data;
  },

  // Get performance data
  getPerformance: async (districtId: number): Promise<Performance> => {
    const response = await apiClient.get<ApiResponse<Performance>>(`/performance/${districtId}`);
    return response.data.data;
  },

  // Get comparison data
  getComparison: async (districtId: number, year: string = '2024-2025'): Promise<Comparison> => {
    const response = await apiClient.get<ApiResponse<Comparison>>(`/compare/${districtId}`, {
      params: { year },
    });
    return response.data.data;
  },
};

// Geolocation API
export const reverseGeocode = async (lat: number, lon: number): Promise<any> => {
  const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
    params: {
      lat,
      lon,
      format: 'json',
      addressdetails: 1,
    },
  });
  return response.data;
};