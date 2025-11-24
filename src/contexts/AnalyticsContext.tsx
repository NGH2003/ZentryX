import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ToolUsage {
    toolId: number;
    toolName: string;
    category: string;
    timestamp: number;
}

interface DailyStats {
    date: string;
    uses: number;
}

interface CategoryStats {
    category: string;
    count: number;
}

interface AnalyticsContextType {
    trackToolUsage: (toolId: number, toolName: string, category: string) => void;
    getDailyUsage: (days: number) => DailyStats[];
    getCategoryDistribution: () => CategoryStats[];
    getTopTools: (limit: number) => { name: string; uses: number; trend: string }[];
    getTotalViews: () => number;
    getActiveUsers: () => number;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [usageData, setUsageData] = useState<ToolUsage[]>(() => {
        const saved = localStorage.getItem('toolUsageAnalytics');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('toolUsageAnalytics', JSON.stringify(usageData));
    }, [usageData]);

    const trackToolUsage = (toolId: number, toolName: string, category: string) => {
        const newUsage: ToolUsage = {
            toolId,
            toolName,
            category,
            timestamp: Date.now(),
        };
        setUsageData(prev => [...prev, newUsage]);
    };

    const getDailyUsage = (days: number): DailyStats[] => {
        const now = new Date();
        const dailyStats: DailyStats[] = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const dayUsage = usageData.filter(usage => {
                const usageDate = new Date(usage.timestamp);
                return usageDate >= date && usageDate < nextDate;
            });

            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dailyStats.push({
                date: dayNames[date.getDay()],
                uses: dayUsage.length,
            });
        }

        return dailyStats;
    };

    const getCategoryDistribution = (): CategoryStats[] => {
        const categoryMap = new Map<string, number>();

        usageData.forEach(usage => {
            const count = categoryMap.get(usage.category) || 0;
            categoryMap.set(usage.category, count + 1);
        });

        const stats: CategoryStats[] = [];
        categoryMap.forEach((count, category) => {
            stats.push({ category, count });
        });

        return stats.sort((a, b) => b.count - a.count);
    };

    const getTopTools = (limit: number) => {
        const toolMap = new Map<string, number>();
        const now = Date.now();
        const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
        const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;

        // Current week usage
        const currentWeekUsage = usageData.filter(u => u.timestamp >= oneWeekAgo);
        currentWeekUsage.forEach(usage => {
            const count = toolMap.get(usage.toolName) || 0;
            toolMap.set(usage.toolName, count + 1);
        });

        // Previous week usage for trend calculation
        const previousWeekUsage = usageData.filter(u => u.timestamp >= twoWeeksAgo && u.timestamp < oneWeekAgo);
        const previousWeekMap = new Map<string, number>();
        previousWeekUsage.forEach(usage => {
            const count = previousWeekMap.get(usage.toolName) || 0;
            previousWeekMap.set(usage.toolName, count + 1);
        });

        const tools: { name: string; uses: number; trend: string }[] = [];
        toolMap.forEach((uses, name) => {
            const previousUses = previousWeekMap.get(name) || 0;
            let trend = '+0%';
            if (previousUses > 0) {
                const change = ((uses - previousUses) / previousUses) * 100;
                trend = change > 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
            } else if (uses > 0) {
                trend = '+100%';
            }
            tools.push({ name, uses, trend });
        });

        return tools.sort((a, b) => b.uses - a.uses).slice(0, limit);
    };

    const getTotalViews = () => {
        return usageData.length;
    };

    const getActiveUsers = () => {
        // Simulate unique users (in real app, track by user ID)
        // For now, estimate based on usage patterns
        return Math.max(1, Math.floor(usageData.length / 10));
    };

    return (
        <AnalyticsContext.Provider
            value={{
                trackToolUsage,
                getDailyUsage,
                getCategoryDistribution,
                getTopTools,
                getTotalViews,
                getActiveUsers,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
};
