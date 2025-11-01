// hooks/useGeolocation.ts
import { useState } from 'react';
import { reverseGeocode, api } from '@/lib/api';
import { useStore } from '@/store/useStore';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { 
    setUserLocation, 
    setSelectedState, 
    setSelectedDistrict,
    language 
  } = useStore();

  const detectLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get user's coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error(
            language === 'en' 
              ? 'Geolocation not supported by your browser'
              : language === 'kn'
              ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್ ಜಿಯೋಲೊಕೇಶನ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ'
              : 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता'
          ));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });

      console.log('📍 Coordinates detected:', { latitude, longitude });

      // Step 2: Reverse geocode to get district and state names
      const geoData = await reverseGeocode(latitude, longitude);
      
      const detectedDistrict = geoData.district;
      const detectedState = geoData.state;

      console.log('🗺️ Geocoding result:', { detectedDistrict, detectedState });

      if (!detectedDistrict || !detectedState) {
        throw new Error(
          language === 'en'
            ? 'Could not determine your district. Please select manually.'
            : language === 'kn'
            ? 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ನಿರ್ಧರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಹಸ್ತಚಾಲಿತವಾಗಿ ಆಯ್ಕೆಮಾಡಿ.'
            : 'आपके जिले का निर्धारण नहीं किया जा सका। कृपया मैन्युअल रूप से चुनें।'
        );
      }

      // Step 3: Check if detected state is Karnataka
      if (detectedState.toUpperCase() !== 'KARNATAKA') {
        throw new Error(
          language === 'en'
            ? `You are in ${detectedState}. This dashboard currently shows data only for Karnataka districts. Please select a Karnataka district manually to explore the demo.`
            : language === 'kn'
            ? `ನೀವು ${detectedState} ನಲ್ಲಿದ್ದೀರಿ. ಈ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರಸ್ತುತ ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಗಳಿಗೆ ಮಾತ್ರ ಡೇಟಾವನ್ನು ತೋರಿಸುತ್ತದೆ. ದಯವಿಟ್ಟು ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಯನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ಆಯ್ಕೆಮಾಡಿ.`
            : `आप ${detectedState} में हैं। यह डैशबोर्ड वर्तमान में केवल कर्नाटक जिलों के लिए डेटा दिखाता है। कृपया कर्नाटक जिले को मैन्युअल रूप से चुनें।`
        );
      }

      // Step 4: Get all states and find Karnataka
      const states = await api.getStates();
      const karnatakaState = states.find(s => 
        s.name.toUpperCase() === 'KARNATAKA' || 
        s.name.toUpperCase().includes('KARNATAKA')
      );

      if (!karnatakaState) {
        throw new Error(
          language === 'en'
            ? 'Karnataka state not found in database'
            : language === 'kn'
            ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ'
            : 'डेटाबेस में कर्नाटक राज्य नहीं मिला'
        );
      }

      console.log('🏛️ Karnataka state found:', karnatakaState);

      // Step 5: Search for the district in Karnataka
      const foundDistrict = await api.searchDistrict(detectedDistrict, karnatakaState.id);

      if (!foundDistrict) {
        throw new Error(
          language === 'en'
            ? `District "${detectedDistrict}" not found in Karnataka. Please select manually.`
            : language === 'kn'
            ? `"${detectedDistrict}" ಜಿಲ್ಲೆ ಕರ್ನಾಟಕದಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಹಸ್ತಚಾಲಿತವಾಗಿ ಆಯ್ಕೆಮಾಡಿ.`
            : `कर्नाटक में "${detectedDistrict}" जिला नहीं मिला। कृपया मैन्युअल रूप से चुनें।`
        );
      }

      console.log('✅ District found in database:', foundDistrict);

      // Step 6: Auto-select state and district
      setSelectedState(karnatakaState.id);
      setSelectedDistrict(foundDistrict.id);

      console.log('🎯 Auto-selected:', {
        state: karnatakaState.name,
        district: foundDistrict.name,
      });

      return {
        district: foundDistrict.name,
        state: karnatakaState.name,
        districtId: foundDistrict.id,
        stateId: karnatakaState.id,
        lat: latitude,
        lon: longitude,
      };
    } catch (err: any) {
      let errorMessage = 'Data not available. Please try again later.';
      
      // Handle specific error cases
      if (err.code === 1) {
        errorMessage = language === 'en'
          ? 'Location permission denied. Please enable location access.'
          : language === 'kn'
          ? 'ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.'
          : 'स्थान अनुमति अस्वीकृत। कृपया स्थान पहुंच सक्षम करें।';
      } else if (err.code === 2) {
        errorMessage = language === 'en'
          ? 'Location unavailable. Please check your device settings.'
          : language === 'kn'
          ? 'ಸ್ಥಳ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಾಧನ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
          : 'स्थान अनुपलब्ध। कृपया अपनी डिवाइस सेटिंग्स जांचें।';
      } else if (err.code === 3) {
        errorMessage = language === 'en'
          ? 'Location request timed out. Please try again.'
          : language === 'kn'
          ? 'ಸ್ಥಳ ವಿನಂತಿ ಅವಧಿ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'स्थान अनुरोध समय समाप्त। कृपया पुनः प्रयास करें।';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Geolocation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { detectLocation, loading, error, clearError };
};