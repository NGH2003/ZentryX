import React from 'react';
import {
    Users,
    Wrench,
    AlertTriangle,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Calendar,
    Download,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const Dashboard: React.FC = () => {
    const { getActiveUsers, getDailyUsage } = useAnalytics();

    const activeUsers = getActiveUsers();
    const totalTools = tools.length;
    const dailyData = getDailyUsage(7);

    // Mock data for activity
    const activities = [
        { id: 1, title: "New user registered", time: "2 mins ago", type: "user", user: "Alice Smith" },
        { id: 2, title: "Tool 'PDF Merger' updated", time: "1 hour ago", type: "tool", user: "System" },
        { id: 3, title: "New bug report received", time: "3 hours ago", type: "alert", user: "Bob Jones" },
        { id: 4, title: "System backup completed", time: "5 hours ago", type: "system", user: "System" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm">
                        <Download size={16} />
                        Export Report
                    </Button>
                    <Button className="gap-2 bg-[#3A7AFE] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-500/25">
                        <Plus size={16} />
                        Add New Tool
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Tools"
                    value={totalTools.toString()}
                    trend="+12%"
                    trendUp={true}
                    icon={Wrench}
                    color="blue"
                    description="vs. last month"
                />
                <StatsCard
                    title="Active Users"
                    value={activeUsers.toLocaleString()}
                    trend="+24%"
                    trendUp={true}
                    icon={Users}
                    color="purple"
                    description="vs. last month"
                />
                <StatsCard
                    title="Error Reports"
                    value="3"
                    trend="-5%"
                    trendUp={false} // Good that it's down (contextually handled below)
                    icon={AlertTriangle}
                    color="amber"
                    description="vs. last month"
                    isInverse={true}
                />
                <StatsCard
                    title="System Health"
                    value="99.9%"
                    trend="Stable"
                    trendUp={true}
                    icon={Activity}
                    color="emerald"
                    description="Uptime"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Traffic Overview</h3>
                            <p className="text-sm text-slate-500">Daily tool usage statistics</p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
                            <button className="px-3 py-1 text-xs font-medium bg-white text-slate-900 shadow-sm rounded-md">7 Days</button>
                            <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">30 Days</button>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorVisitsDashboard" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3A7AFE" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3A7AFE" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
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
                                    fill="url(#colorVisitsDashboard)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#3A7AFE' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                            <p className="text-sm text-slate-500">Latest system events</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={20} />
                        </Button>
                    </div>
                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex gap-4 group">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2",
                                    activity.type === 'user' ? "bg-blue-50 border-blue-100 text-blue-600" :
                                        activity.type === 'tool' ? "bg-purple-50 border-purple-100 text-purple-600" :
                                            activity.type === 'alert' ? "bg-amber-50 border-amber-100 text-amber-600" :
                                                "bg-slate-50 border-slate-100 text-slate-600"
                                )}>
                                    {activity.type === 'user' && <Users size={16} />}
                                    {activity.type === 'tool' && <Wrench size={16} />}
                                    {activity.type === 'alert' && <AlertTriangle size={16} />}
                                    {activity.type === 'system' && <Activity size={16} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-[#3A7AFE] transition-colors">
                                        {activity.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500 font-medium">{activity.user}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-xs text-slate-400">{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <Button variant="ghost" className="w-full text-[#3A7AFE] hover:text-[#1D4ED8] hover:bg-blue-50">
                            View All Activity
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Stats
const StatsCard = ({ title, value, trend, trendUp, icon: Icon, color, description, isInverse }: any) => {
    const colorMap: Record<string, any> = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
        amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    };

    const styles = colorMap[color] || colorMap.blue;

    // Determine trend color
    // If isInverse is true, then trendUp (e.g. + errors) is BAD (red), and trendDown (- errors) is GOOD (green)
    let trendColor = "text-emerald-600 bg-emerald-50";
    let TrendIcon = ArrowUpRight;

    if (isInverse) {
        if (trendUp) {
            trendColor = "text-red-600 bg-red-50"; // Bad
        } else {
            trendColor = "text-emerald-600 bg-emerald-50"; // Good
            TrendIcon = ArrowDownRight;
        }
    } else {
        if (!trendUp) {
            trendColor = "text-red-600 bg-red-50"; // Bad
            TrendIcon = ArrowDownRight;
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl transition-colors group-hover:scale-110 duration-300", styles.bg, styles.text)}>
                    <Icon size={24} />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                    trendColor
                )}>
                    <TrendIcon size={12} />
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{description}</p>
            </div>
        </div>
    );
};

export default Dashboard;
