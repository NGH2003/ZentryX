import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
    Wrench,
    Users,
    Activity,
    Shield,
    TrendingUp,
    Plus,
    FileText,
    Settings,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";

interface OverviewTabProps {
    toolsCount: number;
    usersCount: number;
    usageToday: number;
    isMaintenanceMode: boolean;
    setMaintenanceMode: (value: boolean) => void;
    onNavigate: (tab: string) => void;
}

export function OverviewTab({
    toolsCount,
    usersCount,
    usageToday,
    isMaintenanceMode,
    setMaintenanceMode,
    onNavigate
}: OverviewTabProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Welcome Section */}
            <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl text-white">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
                    <p className="text-blue-100 max-w-2xl text-lg">
                        Here's what's happening with your platform today. You have {usageToday} new interactions and {usersCount} active users.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Button
                            onClick={() => onNavigate("blog")}
                            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </Button>
                        <Button
                            onClick={() => onNavigate("tools")}
                            className="bg-white text-purple-600 hover:bg-blue-50 border-0"
                        >
                            Manage Tools
                        </Button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl" />
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={item}>
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wrench className="w-24 h-24 text-blue-600" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Tools</CardTitle>
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Wrench className="w-4 h-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{toolsCount}</div>
                            <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Active & Running
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users className="w-24 h-24 text-purple-600" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Users className="w-4 h-4 text-purple-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{usersCount}</div>
                            <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Registered Accounts
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity className="w-24 h-24 text-green-600" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Usage Today</CardTitle>
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Activity className="w-4 h-4 text-green-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{usageToday}</div>
                            <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Tool Interactions
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield className="w-24 h-24 text-orange-600" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">System Status</CardTitle>
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-orange-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className={`text-xl font-bold ${isMaintenanceMode ? 'text-orange-600' : 'text-green-600'}`}>
                                        {isMaintenanceMode ? "Maintenance" : "Operational"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {isMaintenanceMode ? "Site is offline" : "All systems normal"}
                                    </span>
                                </div>
                                <Switch checked={isMaintenanceMode} onCheckedChange={setMaintenanceMode} />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Actions & System Health */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={item} className="md:col-span-2">
                    <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all" onClick={() => onNavigate("tools")}>
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Wrench className="w-5 h-5" />
                                </div>
                                <span>Add Tool</span>
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-purple-500 hover:bg-purple-50 transition-all" onClick={() => onNavigate("blog")}>
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <span>Write Post</span>
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-green-500 hover:bg-green-50 transition-all" onClick={() => onNavigate("ads")}>
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span>Manage Ads</span>
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 transition-all" onClick={() => onNavigate("website-branding")}>
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <span>Branding</span>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                        <CardHeader>
                            <CardTitle className="text-gray-100">System Health</CardTitle>
                            <CardDescription className="text-gray-400">Real-time performance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Server Load</span>
                                    <span className="text-green-400">12%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[12%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Memory Usage</span>
                                    <span className="text-blue-400">45%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[45%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Database</span>
                                    <span className="text-purple-400">Healthy</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
