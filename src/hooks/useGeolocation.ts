import { useState } from 'react';
import { reverseGeocode } from '../lib/api';
import { useStore } from '@/store/useStore';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserLocation } = useStore();

  const detectLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get user's coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
        });
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });

      // Reverse geocode to get district
      const geoData = await reverseGeocode(latitude, longitude);
      
      const district = geoData.address?.county || 
                      geoData.address?.state_district || 
                      geoData.address?.city;
      
      const state = geoData.address?.state;

      return { district, state, lat: latitude, lon: longitude };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to detect location';
      setError(errorMessage);
      console.error('Geolocation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { detectLocation, loading, error };
};