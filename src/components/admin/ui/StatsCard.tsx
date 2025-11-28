import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: LucideIcon;
    color?: 'blue' | 'purple' | 'orange' | 'green' | 'red';
    isNegative?: boolean;
    isInverse?: boolean;
    className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    color = 'blue',
    isNegative = false,
    isInverse = false,
    className
}) => {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
        green: "bg-emerald-50 text-emerald-600",
        red: "bg-red-50 text-red-600",
    };

    // Determine trend color
    let trendColor = "text-emerald-600";
    if (change) {
        if (isNegative) trendColor = "text-red-600";
        if (isInverse && change.startsWith('-')) trendColor = "text-emerald-600"; // Good drop (e.g. bounce rate)
        if (isInverse && change.startsWith('+')) trendColor = "text-red-600"; // Bad rise
    }

    return (
        <div className={cn("bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all", className)}>
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl", colorMap[color])}>
                    <Icon size={24} />
                </div>
                {change && (
                    <div className={cn("text-xs font-bold px-2 py-1 rounded-full bg-slate-50", trendColor)}>
                        {change}
                    </div>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            </div>
        </div>
    );
};
