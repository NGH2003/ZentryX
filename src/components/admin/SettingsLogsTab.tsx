import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, Info, CheckCircle } from "lucide-react";

export function SettingsLogsTab() {
    // Mock logs
    const logs = [
        { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 mins ago' },
        { id: 2, type: 'warning', message: 'High memory usage detected', time: '15 mins ago' },
        { id: 3, type: 'success', message: 'New tool "AI Writer" deployed', time: '1 hour ago' },
        { id: 4, type: 'error', message: 'Failed to sync analytics data', time: '2 hours ago' },
        { id: 5, type: 'info', message: 'User database optimized', time: '3 hours ago' },
    ];

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        System Logs
                    </CardTitle>
                    <CardDescription>View recent system activity and events</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                        <div className="divide-y">
                            {logs.map((log) => (
                                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${log.type === 'error' ? 'bg-red-500' :
                                            log.type === 'warning' ? 'bg-yellow-500' :
                                                log.type === 'success' ? 'bg-green-500' :
                                                    'bg-blue-500'
                                        }`} />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium text-gray-900">{log.message}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">{log.time}</span>
                                            <Badge variant="outline" className="text-[10px] uppercase h-4 px-1">
                                                {log.type}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Fill with more mock data for scrolling effect */}
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={`mock-${i}`} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 opacity-50">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium text-gray-500">Routine system check</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">Yesterday</span>
                                            <Badge variant="outline" className="text-[10px] uppercase h-4 px-1 text-gray-400 border-gray-200">
                                                INFO
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
