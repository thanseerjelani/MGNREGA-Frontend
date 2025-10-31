import { create } from 'zustand';

interface AppState {
  // Language
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;

  // Selected state and district
  selectedStateId: number | null;
  selectedDistrictId: number | null;
  setSelectedState: (stateId: number | null) => void;
  setSelectedDistrict: (districtId: number | null) => void;

  // Geolocation
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number } | null) => void;

  // Offline mode
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Language
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  // Selected state and district
  selectedStateId: null,
  selectedDistrictId: null,
  setSelectedState: (stateId) => set({ selectedStateId: stateId, selectedDistrictId: null }),
  setSelectedDistrict: (districtId) => set({ selectedDistrictId: districtId }),

  // Geolocation
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),

  // Offline mode
  isOffline: false,
  setIsOffline: (offline) => set({ isOffline: offline }),
}));