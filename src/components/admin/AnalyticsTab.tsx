import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart2, Users, Eye, Activity, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsTabProps {
    getTotalViews: () => number;
    getActiveUsers: () => number;
    getDailyUsage: () => any[];
    getTopTools: () => any[];
}

export function AnalyticsTab({ getTotalViews, getActiveUsers, getDailyUsage, getTopTools }: AnalyticsTabProps) {
    const topTools = getTopTools();
    const maxUses = Math.max(...topTools.map(t => t.count), 1);

    return (
        <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 font-medium mb-1">Total Views</p>
                                <h3 className="text-4xl font-bold">{getTotalViews().toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-blue-100 text-sm">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>+12% from last week</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-100 font-medium mb-1">Active Users</p>
                                <h3 className="text-4xl font-bold">{getActiveUsers().toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-purple-100 text-sm">
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                            <span>Growing steadily</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-pink-100 font-medium mb-1">Tools Used Today</p>
                                <h3 className="text-4xl font-bold">{getDailyUsage().length.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-pink-100 text-sm">
                            <BarChart2 className="w-4 h-4 mr-1" />
                            <span>High engagement</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Tools Chart */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle>Top Performing Tools</CardTitle>
                        <CardDescription>Most popular tools based on usage count</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {topTools.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-gray-700">{tool.name}</span>
                                        <span className="text-muted-foreground">{tool.count} uses</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(tool.count / maxUses) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={`h-full rounded-full ${index === 0 ? 'bg-blue-500' :
                                                    index === 1 ? 'bg-purple-500' :
                                                        index === 2 ? 'bg-pink-500' :
                                                            'bg-gray-400'
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity (Placeholder for now) */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest actions across the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            User generated content with <span className="text-blue-600">AI Writer</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {i * 15 + 2} minutes ago
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
