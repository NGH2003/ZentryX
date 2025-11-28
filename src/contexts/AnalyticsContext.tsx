import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AnalyticsEvent {
    id: string;
    event_type: string;
    tool_id?: number;
    tool_name?: string;
    category?: string;
    created_at: string;
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
    trackToolUsage: (toolId: number, toolName: string, category: string) => Promise<void>;
    getDailyUsage: (days: number) => DailyStats[];
    getCategoryDistribution: () => CategoryStats[];
    getTopTools: (limit: number) => { name: string; uses: number; trend: string }[];
    getTotalViews: () => number;
    getActiveUsers: () => number;
    isLoading: boolean;
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
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch analytics data on mount
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch last 90 days of events to cover most charts
                const ninetyDaysAgo = new Date();
                ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase as any)
                    .from('analytics_events')
                    .select('*')
                    .gte('created_at', ninetyDaysAgo.toISOString())
                    .order('created_at', { ascending: true });

                if (error) throw error;

                if (data) {
                    setEvents(data as AnalyticsEvent[]);
                }
            } catch (error) {
                console.error('Error fetching analytics:', error);
                // Fallback to local storage if DB fails (or for dev without DB setup)
                const saved = localStorage.getItem('toolUsageAnalytics');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // Map local format to DB format
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setEvents(parsed.map((p: any) => ({
                        id: Math.random().toString(),
                        event_type: 'tool_use',
                        tool_id: p.toolId,
                        tool_name: p.toolName,
                        category: p.category,
                        created_at: new Date(p.timestamp).toISOString()
                    })));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();

        // Subscribe to new events
        const subscription = supabase
            .channel('public:analytics_events')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_events' }, payload => {
                setEvents(prev => [...prev, payload.new as AnalyticsEvent]);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const trackToolUsage = async (toolId: number, toolName: string, category: string) => {
        try {
            // 1. Optimistic update
            const newEvent: AnalyticsEvent = {
                id: crypto.randomUUID(),
                event_type: 'tool_use',
                tool_id: toolId,
                tool_name: toolName,
                category: category,
                created_at: new Date().toISOString()
            };
            setEvents(prev => [...prev, newEvent]);

            // 2. Send to Supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase as any)
                .from('analytics_events')
                .insert([{
                    event_type: 'tool_use',
                    tool_id: toolId,
                    tool_name: toolName,
                    category: category,
                    meta: { source: 'web' }
                }]);

            if (error) throw error;

        } catch (error) {
            console.error('Error tracking usage:', error);
            // Backup to local storage
            const saved = localStorage.getItem('toolUsageAnalytics') || '[]';
            const parsed = JSON.parse(saved);
            parsed.push({ toolId, toolName, category, timestamp: Date.now() });
            localStorage.setItem('toolUsageAnalytics', JSON.stringify(parsed));
        }
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

            const dayUsage = events.filter(e => {
                const eventDate = new Date(e.created_at);
                return eventDate >= date && eventDate < nextDate;
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

        events.forEach(e => {
            if (e.category) {
                const count = categoryMap.get(e.category) || 0;
                categoryMap.set(e.category, count + 1);
            }
        });

        const stats: CategoryStats[] = [];
        categoryMap.forEach((count, category) => {
            stats.push({ category, count });
        });

        return stats.sort((a, b) => b.count - a.count);
    };

    const getTopTools = (limit: number) => {
        const toolMap = new Map<string, number>();
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

        // Current week usage
        const currentWeekEvents = events.filter(e => new Date(e.created_at) >= oneWeekAgo);
        currentWeekEvents.forEach(e => {
            if (e.tool_name) {
                const count = toolMap.get(e.tool_name) || 0;
                toolMap.set(e.tool_name, count + 1);
            }
        });

        // Previous week usage for trend calculation
        const previousWeekEvents = events.filter(e => {
            const d = new Date(e.created_at);
            return d >= twoWeeksAgo && d < oneWeekAgo;
        });

        const previousWeekMap = new Map<string, number>();
        previousWeekEvents.forEach(e => {
            if (e.tool_name) {
                const count = previousWeekMap.get(e.tool_name) || 0;
                previousWeekMap.set(e.tool_name, count + 1);
            }
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
        return events.length;
    };

    const getActiveUsers = () => {
        // Estimate active users in the last 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const recentEvents = events.filter(e => new Date(e.created_at) >= thirtyMinutesAgo);

        if (recentEvents.length === 0) return 0;

        return Math.max(1, Math.ceil(recentEvents.length / 3));
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
                isLoading
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
};
