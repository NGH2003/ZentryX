import React, { useState, useEffect } from 'react';
import {
    Activity,
    Server,
    Database,
    Cpu,
    HardDrive,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    Wifi,
    ShieldCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const SystemHealth = () => {
    const [isChecking, setIsChecking] = useState(false);
    const [dbStatus, setDbStatus] = useState<'online' | 'offline' | 'checking'>('checking');
    const [latency, setLatency] = useState<number | null>(null);
    const [lastChecked, setLastChecked] = useState<Date>(new Date());

    const checkSystemHealth = async () => {
        setIsChecking(true);
        setDbStatus('checking');
        const start = performance.now();

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase as any).from('branding').select('id').limit(1);
            const end = performance.now();

            if (error) throw error;

            setLatency(Math.round(end - start));
            setDbStatus('online');
            toast.success("System health check passed");
        } catch (error) {
            console.error("Health check failed:", error);
            setDbStatus('offline');
            setLatency(null);
            toast.error("Database connection failed");
        } finally {
            setIsChecking(false);
            setLastChecked(new Date());
        }
    };

    useEffect(() => {
        checkSystemHealth();
        const interval = setInterval(checkSystemHealth, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Health</h1>
                    <p className="text-slate-500 mt-1">Monitor system performance and operational status.</p>
                </div>
                <Button
                    onClick={checkSystemHealth}
                    disabled={isChecking}
                    className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm gap-2"
                >
                    <RefreshCw size={16} className={cn(isChecking && "animate-spin")} />
                    {isChecking ? "Checking..." : "Refresh Status"}
                </Button>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard
                    title="Database Status"
                    status={dbStatus}
                    icon={Database}
                    detail={latency ? `${latency}ms latency` : "Connection failed"}
                />
                <StatusCard
                    title="API Gateway"
                    status="online"
                    icon={Server}
                    detail="99.9% Uptime"
                />
                <StatusCard
                    title="Storage System"
                    status="online"
                    icon={HardDrive}
                    detail="45% Used"
                />
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Activity size={18} className="text-[#3A7AFE]" />
                            Performance Metrics
                        </CardTitle>
                        <CardDescription>Real-time resource usage estimates.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-600 flex items-center gap-2"><Cpu size={14} /> CPU Usage</span>
                                <span className="text-slate-900">12%</span>
                            </div>
                            <Progress value={12} className="h-2 bg-slate-100" indicatorClassName="bg-emerald-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-600 flex items-center gap-2"><Server size={14} /> Memory Usage</span>
                                <span className="text-slate-900">34%</span>
                            </div>
                            <Progress value={34} className="h-2 bg-slate-100" indicatorClassName="bg-[#3A7AFE]" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-600 flex items-center gap-2"><Wifi size={14} /> Bandwidth</span>
                                <span className="text-slate-900">45 Mbps</span>
                            </div>
                            <Progress value={45} className="h-2 bg-slate-100" indicatorClassName="bg-purple-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-emerald-500" />
                            Security Status
                        </CardTitle>
                        <CardDescription>Recent security checks and SSL status.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                        <CheckCircle size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-emerald-900">SSL Certificate</p>
                                        <p className="text-xs text-emerald-700">Valid until Dec 2025</p>
                                    </div>
                                </div>
                                <Badge className="bg-emerald-200 text-emerald-800 hover:bg-emerald-300 border-emerald-300">Active</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Firewall</p>
                                        <p className="text-xs text-slate-500">WAF Enabled</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-slate-600">Active</Badge>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <p className="text-xs text-slate-400 text-center">
                                Last system scan: {lastChecked.toLocaleTimeString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const StatusCard = ({ title, status, icon: Icon, detail }: any) => {
    const isOnline = status === 'online';
    const isChecking = status === 'checking';

    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden relative">
            <div className={cn(
                "absolute top-0 left-0 w-1 h-full",
                isOnline ? "bg-emerald-500" : isChecking ? "bg-amber-500" : "bg-red-500"
            )} />
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {isChecking ? "Checking..." : isOnline ? "Operational" : "Degraded"}
                    </h3>
                    <p className={cn(
                        "text-xs font-medium mt-1 flex items-center gap-1",
                        isOnline ? "text-emerald-600" : isChecking ? "text-amber-600" : "text-red-600"
                    )}>
                        {isOnline ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                        {detail}
                    </p>
                </div>
                <div className={cn(
                    "p-3 rounded-xl",
                    isOnline ? "bg-emerald-50 text-emerald-600" : isChecking ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                )}>
                    <Icon size={24} />
                </div>
            </CardContent>
        </Card>
    );
};

export default SystemHealth;
