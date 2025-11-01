// components/Header.tsx
import React from 'react';
import { Globe, MapPin, Loader2, CheckCircle, Info, X, AlertCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/translations';
import { useGeolocation } from '@/hooks/useGeolocation';

export const Header: React.FC = () => {
    const { language, setLanguage } = useStore();
    const t = useTranslation(language);
    const { detectLocation, loading, error, clearError } = useGeolocation();
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [showInfoBanner, setShowInfoBanner] = React.useState(false);

    const handleDetectLocation = async () => {
        setSuccessMessage(null);
        setShowInfoBanner(false);
        const result = await detectLocation();

        if (result) {
            // Show success message
            const message = language === 'en'
                ? `Location detected: ${result.district}, ${result.state}`
                : language === 'kn'
                    ? `ಸ್ಥಳ ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ: ${result.district}, ${result.state}`
                    : `स्थान का पता लगाया गया: ${result.district}, ${result.state}`;

            setSuccessMessage(message);

            // Hide success message after 5 seconds
            setTimeout(() => setSuccessMessage(null), 5000);
        }
    };

    // Show info banner if error is about non-Karnataka location
    React.useEffect(() => {
        if (error && (error.includes('Karnataka') || error.includes('कर्नाटक') || error.includes('ಕರ್ನಾಟಕ'))) {
            setShowInfoBanner(true);
        }
    }, [error]);

    const getDetectingText = () => {
        switch (language) {
            case 'en':
                return 'Detecting...';
            case 'kn':
                return 'ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...';
            case 'hi':
                return 'पता लगाया जा रहा है...';
            default:
                return 'Detecting...';
        }
    };

    const getInfoBannerText = () => {
        switch (language) {
            case 'en':
                return {
                    title: 'Demo Scope: Karnataka Only',
                    message: 'This dashboard demonstrates MGNREGA data for Karnataka state only. Please select any Karnataka district from the dropdown below to explore the data.'
                };
            case 'kn':
                return {
                    title: 'ಡೆಮೊ ವ್ಯಾಪ್ತಿ: ಕರ್ನಾಟಕ ಮಾತ್ರ',
                    message: 'ಈ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಕರ್ನಾಟಕ ರಾಜ್ಯಕ್ಕೆ ಮಾತ್ರ MGNREGA ಡೇಟಾವನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ. ದಯವಿಟ್ಟು ಡೇಟಾವನ್ನು ಅನ್ವೇಷಿಸಲು ಕೆಳಗಿನ ಡ್ರಾಪ್‌ಡೌನ್‌ನಿಂದ ಯಾವುದೇ ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.'
                };
            case 'hi':
                return {
                    title: 'डेमो स्कोप: केवल कर्नाटक',
                    message: 'यह डैशबोर्ड केवल कर्नाटक राज्य के लिए MGNREGA डेटा प्रदर्शित करता है। कृपया डेटा देखने के लिए नीचे दिए गए ड्रॉपडाउन से कोई भी कर्नाटक जिला चुनें।'
                };
            default:
                return {
                    title: 'Demo Scope: Karnataka Only',
                    message: 'This dashboard demonstrates MGNREGA data for Karnataka state only. Please select any Karnataka district from the dropdown below to explore the data.'
                };
        }
    };

    return (
        <>
            <header className="bg-linear-to-r from-blue-600 to-blue-800 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Title Section */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap">
                            Our Voice, Our Rights
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl mt-1 opacity-90">
                            {t.appSubtitle}
                        </p>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-3">
                        {/* Detect Location Button */}
                        <button
                            onClick={handleDetectLocation}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-12 shadow-md"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <MapPin className="w-5 h-5" />
                            )}
                            <span className="text-sm md:text-base">
                                {loading ? getDetectingText() : t.detectLocation}
                            </span>
                        </button>

                        {/* Language Selector */}
                        <div className="flex items-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors h-12 shadow-md">
                            <Globe className="w-5 h-5" />
                            <select
                                value={language}
                                onChange={(e) =>
                                    setLanguage(e.target.value as 'en' | 'kn' | 'hi')
                                }
                                className="bg-transparent focus:outline-none cursor-pointer text-sm md:text-base font-semibold"
                            >
                                <option value="en">English</option>
                                <option value="kn">ಕನ್ನಡ</option>
                                <option value="hi">हिंदी</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            {/* Info Banner for Non-Karnataka Users */}
            {showInfoBanner && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 shadow-md animate-slide-in">
                    <div className="container mx-auto px-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Info className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-blue-900 text-base">
                                        {getInfoBannerText().title}
                                    </p>
                                    <p className="text-blue-800 text-sm mt-1">
                                        {getInfoBannerText().message}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowInfoBanner(false)}
                                className="text-blue-600 hover:text-blue-800 transition-colors ml-4"
                                aria-label="Close banner"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message Toast */}
            {successMessage && (
                <div className="fixed top-20 right-4 z-50 animate-slide-in">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 max-w-md">
                        <CheckCircle className="w-6 h-6 shrink-0" />
                        <p className="font-medium">{successMessage}</p>
                    </div>
                </div>
            )}

            {/* Error Message Toast - Only for non-Karnataka errors */}
            {error && !loading && !showInfoBanner && (
                <div className="fixed top-20 right-4 z-50 animate-slide-in">
                    <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 max-w-md">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <p className="font-medium flex-1">{error}</p>
                        {/* ✅ WORKING CLOSE BUTTON */}
                        <button
                            onClick={clearError}
                            className="text-white hover:text-gray-200 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};