import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import {
    Calendar,
    Download,
    TrendingUp,
    Users,
    MousePointerClick,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/contexts/AnalyticsContext';

const AnalyticsDashboard = () => {
    const [timeRange, setTimeRange] = useState('7d');
    const {
        getDailyUsage,
        getCategoryDistribution,
        getTopTools,
        getTotalViews,
        getActiveUsers,
        isLoading
    } = useAnalytics();

    const dailyTrafficData = getDailyUsage(timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90);
    const categoryData = getCategoryDistribution().map((item, index) => ({
        name: item.category,
        value: item.count,
        color: ['#3A7AFE', '#9333EA', '#F59E0B', '#10B981', '#64748B'][index % 5]
    }));
    const topToolsData = getTopTools(5);
    const totalVisits = getTotalViews();
    const activeUsers = getActiveUsers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#3A7AFE] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Loading analytics data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h1>
                    <p className="text-slate-500 mt-1">Deep insights into your platform's performance and user behavior.</p>
                </div>
                <div className="flex gap-3">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[160px] bg-white border-slate-200 shadow-sm rounded-xl">
                            <Calendar className="mr-2 h-4 w-4 text-slate-500" />
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 3 Months</SelectItem>
                            <SelectItem value="1y">This Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-2 bg-white border-slate-200 shadow-sm rounded-xl text-slate-700 hover:bg-slate-50">
                        <Download size={16} /> Export
                    </Button>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Visits"
                    value={totalVisits.toLocaleString()}
                    change="+12.5%" // This would ideally be calculated
                    icon={Users}
                    color="blue"
                />
                <MetricCard
                    title="Tool Usage"
                    value={dailyTrafficData.reduce((acc, curr) => acc + curr.uses, 0).toLocaleString()}
                    change="+8.1%"
                    icon={MousePointerClick}
                    color="purple"
                />
                <MetricCard
                    title="Avg. Session"
                    value="4m 32s"
                    change="-2.4%"
                    icon={Clock}
                    color="orange"
                    isNegative
                />
                <MetricCard
                    title="Bounce Rate"
                    value="42.8%"
                    change="-1.2%"
                    icon={TrendingUp}
                    color="green"
                    isInverse
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Chart */}
                <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-900">Traffic Overview</CardTitle>
                                <CardDescription>Daily visits vs unique users over time</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#3A7AFE]"></div> Visits</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dailyTrafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3A7AFE" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3A7AFE" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748B', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                            padding: '12px'
                                        }}
                                        cursor={{ stroke: '#3A7AFE', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="uses"
                                        stroke="#3A7AFE"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#3A7AFE' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-bold text-slate-900">Popular Categories</CardTitle>
                        <CardDescription>Distribution of tool usage</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col justify-center">
                        <div className="h-[220px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={4}
                                        dataKey="value"
                                        cornerRadius={4}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold text-slate-900">{categoryData.length}</span>
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Categories</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-6 space-y-3">
                            {categoryData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm group cursor-default">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-3 h-3 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-600 font-medium">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-slate-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section: Top Tools & Geo Map (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-bold text-slate-900">Top Performing Tools</CardTitle>
                        <CardDescription>Most used tools in the selected period</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {topToolsData.map((tool, i) => (
                                <div key={tool.name} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors group">
                                    <div className="flex items-center gap-4 flex-1">
                                        <span className={cn(
                                            "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors",
                                            i === 0 ? "bg-amber-100 text-amber-700" :
                                                i === 1 ? "bg-slate-200 text-slate-700" :
                                                    i === 2 ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-500"
                                        )}>
                                            {i + 1}
                                        </span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900 group-hover:text-[#3A7AFE] transition-colors">{tool.name}</p>
                                            <div className="w-full max-w-[200px] h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                                <div
                                                    className="h-full bg-[#3A7AFE] rounded-full"
                                                    style={{ width: `${Math.min(100, (tool.uses / (topToolsData[0]?.uses || 1)) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right pl-4">
                                        <p className="font-bold text-slate-900">{tool.uses.toLocaleString()}</p>
                                        <p className={cn("text-xs font-medium flex items-center justify-end gap-0.5", tool.trend.startsWith('+') ? "text-emerald-600" : "text-red-600")}>
                                            {tool.trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {tool.trend}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-slate-900 text-white relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(58,122,254,0.4),transparent_70%)]"></div>
                    </div>

                    <CardHeader className="relative z-10 border-b border-slate-800 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                                    <Activity size={18} className="text-[#3A7AFE]" />
                                    Real-time Activity
                                </CardTitle>
                                <CardDescription className="text-slate-400">Current active users on the platform</CardDescription>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium animate-pulse">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                Live
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10 flex flex-col items-center justify-center h-[300px] p-6">
                        <div className="relative mb-2">
                            <div className="absolute inset-0 bg-[#3A7AFE] blur-2xl opacity-20 animate-pulse"></div>
                            <h2 className="text-7xl font-bold relative z-10 tracking-tighter">{activeUsers}</h2>
                        </div>
                        <p className="text-slate-400 font-medium">Users online right now</p>

                        <div className="mt-10 w-full space-y-5 max-w-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#3A7AFE]"></div> Desktop
                                    </span>
                                    <span className="font-bold">65%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#3A7AFE] w-[65%] rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div> Mobile
                                    </span>
                                    <span className="font-bold">35%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[35%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Helper Component for Metrics
const MetricCard = ({ title, value, change, icon: Icon, color, isNegative, isInverse }: any) => {
    const colorMap: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100",
        green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };

    // Determine trend color
    let trendColor = "text-emerald-600 bg-emerald-50";
    let trendIcon = <ArrowUpRight size={12} />;

    if (isNegative) {
        trendColor = "text-red-600 bg-red-50";
        trendIcon = <ArrowDownRight size={12} />;
    }

    if (isInverse && change.startsWith('-')) {
        trendColor = "text-emerald-600 bg-emerald-50"; // Good drop (e.g. bounce rate)
        trendIcon = <ArrowDownRight size={12} />;
    } else if (isInverse && !change.startsWith('-')) {
        trendColor = "text-red-600 bg-red-50"; // Bad rise
        trendIcon = <ArrowUpRight size={12} />;
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl border transition-transform group-hover:scale-110", colorMap[color])}>
                    <Icon size={24} />
                </div>
                <div className={cn("text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1", trendColor)}>
                    {trendIcon}
                    {change}
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
