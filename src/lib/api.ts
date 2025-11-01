// lib/api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

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
    
    // Network error (backend down or no internet)
    if (!error.response) {
      const friendlyMessage = 'Service temporarily unavailable. Please check your internet connection or try again later.';
      
      // Show user-friendly alert
      if (typeof window !== 'undefined') {
        // Only show alert if it's a critical API call (not background checks)
        console.error(friendlyMessage);
      }
      
      error.message = friendlyMessage;
    }
    
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

export interface GeocodingResponse {
  district: string;
  state: string;
  lat: number;
  lon: number;
  address: {
    county?: string;
    state_district?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
}

// API Functions with error handling
export const api = {
  // Get all states
  getStates: async (): Promise<State[]> => {
    try {
      const response = await apiClient.get<ApiResponse<State[]>>('/states');
      return response.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  // Get districts by state
  getDistricts: async (stateId: number): Promise<District[]> => {
    try {
      const response = await apiClient.get<ApiResponse<District[]>>(`/districts/${stateId}`);
      return response.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  // Search district by name
  searchDistrict: async (name: string, stateId?: number): Promise<District | null> => {
    try {
      const params: any = { name };
      if (stateId) params.stateId = stateId;
      
      const response = await apiClient.get<ApiResponse<District>>('/districts/search', { params });
      
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      console.error('Error searching district:', error);
      return null;
    }
  },

  // Get performance data
  getPerformance: async (districtId: number): Promise<Performance> => {
    try {
      const response = await apiClient.get<ApiResponse<Performance>>(`/performance/${districtId}`);
      return response.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  // Get comparison data
  getComparison: async (districtId: number, year: string = '2024-2025'): Promise<Comparison> => {
    try {
      const response = await apiClient.get<ApiResponse<Comparison>>(`/compare/${districtId}`, {
        params: { year },
      });
      return response.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  // Health check endpoint
  checkHealth: async (): Promise<boolean> => {
    try {
      await apiClient.get('/health', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  },
};

// Geolocation API - USES YOUR SPRING BOOT BACKEND
export const reverseGeocode = async (lat: number, lon: number): Promise<GeocodingResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<GeocodingResponse>>('/geocode', {
      params: { lat, lon },
    });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Geocoding failed');
    }
  } catch (error: any) {
    console.error('Geocoding error:', error);
    
    // Network error
    if (!error.response) {
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }
    
    // Handle specific errors
    if (error.response?.status === 429) {
      throw new Error('Service temporarily busy. Please try again in a moment.');
    }
    
    throw new Error(error.response?.data?.message || 'Data not available. Please try again later.');
  }
};