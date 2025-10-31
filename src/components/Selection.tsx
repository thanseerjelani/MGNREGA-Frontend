import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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

    const { data: states, isLoading: statesLoading } = useStates();
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

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
                            disabled={statesLoading}
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
                            disabled={!selectedStateId || districtsLoading}
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