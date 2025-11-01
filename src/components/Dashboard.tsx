import React from 'react';
import { Users, Calendar, DollarSign, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import { usePerformance, useComparison } from '@/hooks/useData';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/translations';
import { PerformanceCard } from './PerformanceCard';
import { ComparisonChart } from './ComparisonChart';

export const Dashboard: React.FC = () => {
    const { selectedDistrictId, language, isOffline } = useStore();
    const t = useTranslation(language);

    const { data: performance, isLoading, error } = usePerformance(selectedDistrictId);
    const { data: comparison } = useComparison(selectedDistrictId);

    if (!selectedDistrictId) {
        return (
            <div className="text-center py-16 px-4">
                <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">{t.selectDistrict}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center py-16">
                <div className="loading w-16 h-16 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-xl">{t.loading}</p>
            </div>
        );
    }

    if (error || !performance) {
        return (
            <div className="text-center py-16 px-4">
                <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <p className="text-xl text-red-600">{t.noData}</p>
            </div>
        );
    }

    const getPerformanceLevel = (level: string): 'success' | 'warning' | 'danger' => {
        if (level === 'ABOVE_AVERAGE') return 'success';
        if (level === 'MODERATE') return 'warning';
        return 'danger';
    };

    const formatNumber = (num: number): string => {
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
        if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Helper function to get "days" word in current language
    const getDaysText = (): string => {
        switch (language) {
            case 'en':
                return 'days';
            case 'kn':
                return 'ದಿನಗಳು';
            case 'hi':
                return 'दिन';
            default:
                return 'days';
        }
    };

    // Helper function to format date in current language
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        let locale = 'en-IN';

        switch (language) {
            case 'kn':
                locale = 'kn-IN';
                break;
            case 'hi':
                locale = 'hi-IN';
                break;
            default:
                locale = 'en-IN';
        }

        return date.toLocaleDateString(locale);
    };

    return (
        <div className="space-y-6">
            {/* Offline indicator */}
            {isOffline && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-amber-900">
                    <AlertCircle className="w-6 h-6 inline mr-2" />
                    {t.offline}
                </div>
            )}

            {/* District Info */}
            <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold">{performance.districtName}</h2>
                <p className="text-base md:text-lg mt-2">
                    {t.month}: {performance.monthName} | {t.year}: {performance.finYear}
                </p>
                <p className="text-sm mt-2 opacity-90">
                    {t.lastUpdated}: {formatDate(performance.lastUpdated)}
                </p>
            </div>

            {/* Performance Level Badge */}
            <div className={`rounded-lg p-4 text-center text-lg md:text-xl font-bold shadow-md ${performance.performanceLevel === 'ABOVE_AVERAGE'
                    ? 'bg-green-100 text-green-800'
                    : performance.performanceLevel === 'MODERATE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                {performance.performanceLevel === 'ABOVE_AVERAGE'
                    ? '🟢 ' + t.aboveAverage
                    : performance.performanceLevel === 'MODERATE'
                        ? '🟠 ' + t.moderate
                        : '🔴 ' + t.belowAverage}
            </div>

            {/* Performance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <PerformanceCard
                    title={t.households}
                    value={formatNumber(performance.totalHouseholdsWorked)}
                    icon={Users}
                    level={getPerformanceLevel(performance.performanceLevel)}
                />

                <PerformanceCard
                    title={t.averageDays}
                    value={`${performance.averageDaysEmployment} ${getDaysText()}`}
                    icon={Calendar}
                    level={getPerformanceLevel(performance.performanceLevel)}
                />

                <PerformanceCard
                    title={t.wages}
                    value={formatNumber(performance.totalWages)}
                    icon={DollarSign}
                    level="success"
                />

                <PerformanceCard
                    title={t.ongoingProjects}
                    value={performance.ongoingWorks.toLocaleString(
                        language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN'
                    )}
                    icon={Briefcase}
                    level="warning"
                />

                <PerformanceCard
                    title={t.completedProjects}
                    value={performance.completedWorks.toLocaleString(
                        language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN'
                    )}
                    icon={TrendingUp}
                    level="success"
                />

                <PerformanceCard
                    title={t.totalExpenditure}
                    value={formatNumber(performance.totalExpenditure)}
                    icon={DollarSign}
                    level="warning"
                />
            </div>

            {/* Comparison Chart */}
            {comparison && comparison.previous && (
                <div className="bg-white rounded-lg border-2 p-6 shadow-md">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">{t.comparison}</h3>
                    <ComparisonChart comparison={comparison} language={language} />
                </div>
            )}
        </div>
    );
};