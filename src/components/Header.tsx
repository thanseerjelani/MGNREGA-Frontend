import React from 'react';
import { Globe, MapPin } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/translations';
import { useGeolocation } from '@/hooks/useGeolocation';

export const Header: React.FC = () => {
    const { language, setLanguage } = useStore();
    const t = useTranslation(language);
    const { detectLocation, loading } = useGeolocation();

    const handleLanguageToggle = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const handleDetectLocation = async () => {
        const result = await detectLocation();
        if (result) {
            alert(`${language === 'en' ? 'Detected' : 'पता लगाया'}: ${result.district}, ${result.state}`);
        }
    };

    return (
        <header className="bg-linear-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Title */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{t.appTitle}</h1>
                        <p className="text-lg md:text-xl mt-1 opacity-90">{t.appSubtitle}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        {/* Detect Location */}
                        <button
                            onClick={handleDetectLocation}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MapPin className="w-5 h-5" />
                            {loading ? (language === 'en' ? 'Detecting...' : 'खोज रहे हैं...') : t.detectLocation}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={handleLanguageToggle}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                            {language === 'en' ? 'हिंदी' : 'English'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};