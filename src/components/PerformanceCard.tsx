import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface PerformanceCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    level?: 'success' | 'warning' | 'danger';
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
    title,
    value,
    icon: Icon,
    level = 'success',
    trend,
    trendValue,
}) => {
    const levelColors = {
        success: 'bg-green-50 border-green-200 text-green-900',
        warning: 'bg-amber-50 border-amber-200 text-amber-900',
        danger: 'bg-red-50 border-red-200 text-red-900',
    };

    const iconColors = {
        success: 'text-green-600',
        warning: 'text-amber-600',
        danger: 'text-red-600',
    };

    const trendIcons = {
        up: '↑',
        down: '↓',
        stable: '→',
    };

    return (
        <div className={`rounded-lg border-2 p-6 ${levelColors[level]} transition-all hover:shadow-lg`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-8 h-8 ${iconColors[level]}`} />
                        <h3 className="text-lg font-semibold">{title}</h3>
                    </div>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                    {trend && trendValue && (
                        <p className="text-sm mt-2 flex items-center gap-1">
                            <span className="text-2xl">{trendIcons[trend]}</span>
                            <span>{trendValue}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};