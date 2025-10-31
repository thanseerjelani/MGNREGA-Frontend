import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Comparison } from '@/lib/api';
import { useTranslation } from '@/lib/translations';

interface ComparisonChartProps {
    comparison: Comparison;
    language: 'en' | 'hi';
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ comparison, language }) => {
    const t = useTranslation(language);

    if (!comparison.previous || !comparison.comparison) {
        return <p className="text-gray-600">{t.noData}</p>;
    }

    const data = [
        {
            name: t.households,
            [t.previous]: comparison.previous.totalHouseholdsWorked,
            [t.current]: comparison.current.totalHouseholdsWorked,
        },
        {
            name: t.averageDays,
            [t.previous]: comparison.previous.averageDaysEmployment,
            [t.current]: comparison.current.averageDaysEmployment,
        },
        {
            name: t.ongoingProjects,
            [t.previous]: comparison.previous.ongoingWorks,
            [t.current]: comparison.current.ongoingWorks,
        },
    ];

    return (
        <div>
            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: '14px' }} />
                    <YAxis style={{ fontSize: '14px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={t.previous} fill="#f59e0b" />
                    <Bar dataKey={t.current} fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>

            {/* Change Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{t.households}</p>
                    <p className={`text-2xl font-bold ${comparison.comparison.householdsChange > 0 ? 'text-green-600' :
                            comparison.comparison.householdsChange < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {comparison.comparison.householdsChange > 0 ? '↑' : comparison.comparison.householdsChange < 0 ? '↓' : '→'}
                        {Math.abs(comparison.comparison.householdsChange).toFixed(1)}%
                    </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{t.averageDays}</p>
                    <p className={`text-2xl font-bold ${comparison.comparison.daysWorkedChange > 0 ? 'text-green-600' :
                            comparison.comparison.daysWorkedChange < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {comparison.comparison.daysWorkedChange > 0 ? '↑' : comparison.comparison.daysWorkedChange < 0 ? '↓' : '→'}
                        {Math.abs(comparison.comparison.daysWorkedChange).toFixed(1)}%
                    </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{t.wages}</p>
                    <p className={`text-2xl font-bold ${comparison.comparison.wagesChange > 0 ? 'text-green-600' :
                            comparison.comparison.wagesChange < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {comparison.comparison.wagesChange > 0 ? '↑' : comparison.comparison.wagesChange < 0 ? '↓' : '→'}
                        {Math.abs(comparison.comparison.wagesChange).toFixed(1)}%
                    </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{t.ongoingProjects}</p>
                    <p className={`text-2xl font-bold ${comparison.comparison.projectsChange > 0 ? 'text-green-600' :
                            comparison.comparison.projectsChange < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {comparison.comparison.projectsChange > 0 ? '↑' : comparison.comparison.projectsChange < 0 ? '↓' : '→'}
                        {Math.abs(comparison.comparison.projectsChange)}
                    </p>
                </div>
            </div>
        </div>
    );
};