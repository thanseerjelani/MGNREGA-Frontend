// store/useStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Language
  language: 'en' | 'kn' | 'hi';
  setLanguage: (lang: 'en' | 'kn' | 'hi') => void;

  // Selected state and district
  selectedStateId: number | null;
  selectedDistrictId: number | null;
  setSelectedState: (stateId: number | null) => void;
  setSelectedDistrict: (districtId: number | null) => void;

  // Geolocation
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number } | null) => void;
  
  detectedDistrictName: string | null;
  setDetectedDistrictName: (name: string | null) => void;

  // Offline mode
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Selected state and district
      selectedStateId: null,
      selectedDistrictId: null,
      setSelectedState: (stateId) => set({ 
        selectedStateId: stateId, 
        selectedDistrictId: null 
      }),
      setSelectedDistrict: (districtId) => set({ selectedDistrictId: districtId }),

      // Geolocation
      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),
      
      detectedDistrictName: null,
      setDetectedDistrictName: (name) => set({ detectedDistrictName: name }),

      // Offline mode
      isOffline: false,
      setIsOffline: (offline) => set({ isOffline: offline }),
    }),
    {
      name: 'mgnrega-storage',
      partialize: (state) => ({
        language: state.language,
        selectedStateId: state.selectedStateId,
        selectedDistrictId: state.selectedDistrictId,
      }),
    }
  )
);