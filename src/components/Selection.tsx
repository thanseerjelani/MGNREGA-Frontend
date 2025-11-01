import React, { useEffect, useState } from 'react';
import { ChevronDown, AlertCircle, RefreshCw } from 'lucide-react';
import { useStates, useDistricts } from '@/hooks/useData';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/translations';

export const Selection: React.FC = () => {
    const {
        selectedStateId,
        selectedDistrictId,
        setSelectedState,
        setSelectedDistrict,
        language
    } = useStore();

    const t = useTranslation(language);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    const { data: states, isLoading: statesLoading, error: statesError, refetch: refetchStates } = useStates();
    const { data: districts, isLoading: districtsLoading } = useDistricts(selectedStateId);

    // Auto-select Karnataka if available
    useEffect(() => {
        if (states && states.length > 0 && !selectedStateId) {
            const karnataka = states.find(s => s.name === 'KARNATAKA');
            if (karnataka) {
                setSelectedState(karnataka.id);
            }
        }
    }, [states, selectedStateId, setSelectedState]);

    // Handle connection errors
    useEffect(() => {
        if (statesError) {
            const errorMessage = (statesError as any)?.message || 'Unable to connect to server. Please try again later.';
            setConnectionError(errorMessage);
        } else {
            setConnectionError(null);
        }
    }, [statesError]);

    const handleRetry = () => {
        setConnectionError(null);
        refetchStates();
    };

    const getErrorMessage = () => {
        switch (language) {
            case 'en':
                return {
                    title: 'Connection Error',
                    retry: 'Retry'
                };
            case 'kn':
                return {
                    title: 'ಸಂಪರ್ಕ ದೋಷ',
                    retry: 'ಮರುಪ್ರಯತ್ನಿಸಿ'
                };
            case 'hi':
                return {
                    title: 'कनेक्शन त्रुटि',
                    retry: 'पुनः प्रयास करें'
                };
            default:
                return {
                    title: 'Connection Error',
                    retry: 'Retry'
                };
        }
    };

    const errorText = getErrorMessage();

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Connection Error Banner */}
            {connectionError && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded animate-slide-in">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-red-900 text-base">
                                    {errorText.title}
                                </p>
                                <p className="text-red-800 text-sm mt-1">
                                    {connectionError}
                                </p>
                                <button
                                    onClick={handleRetry}
                                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    {errorText.retry}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* State Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-3 text-gray-700">
                        {t.selectState}
                    </label>
                    <div className="relative">
                        <select
                            value={selectedStateId || ''}
                            onChange={(e) => setSelectedState(Number(e.target.value))}
                            disabled={statesLoading || !!connectionError}
                            className="w-full px-4 py-3 pr-10 text-lg border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">{statesLoading ? t.loading : t.selectState}</option>
                            {states?.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* District Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-3 text-gray-700">
                        {t.selectDistrict}
                    </label>
                    <div className="relative">
                        <select
                            value={selectedDistrictId || ''}
                            onChange={(e) => setSelectedDistrict(Number(e.target.value))}
                            disabled={!selectedStateId || districtsLoading || !!connectionError}
                            className="w-full px-4 py-3 pr-10 text-lg border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">
                                {!selectedStateId ? t.selectState :
                                    districtsLoading ? t.loading :
                                        t.selectDistrict}
                            </option>
                            {districts?.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};