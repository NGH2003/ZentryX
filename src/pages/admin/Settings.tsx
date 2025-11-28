import React, { useState, useEffect } from 'react';
import {
    Save,
    Shield,
    Bell,
    Globe,
    Database,
    Key,
    History,
    RefreshCw,
    LogOut,
    Lock,
    Mail,
    Server,
    Download,
    AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { useBranding } from '@/contexts/BrandingContext';
import { useMaintenance } from '@/contexts/MaintenanceContext';

// Mock Activity Logs
const activityLogs = [
    { id: 1, action: "Updated 'PDF Merger' tool", user: "Sarah Editor", time: "2 mins ago", type: "edit" },
    { id: 2, action: "Logged in from new IP", user: "Admin User", time: "1 hour ago", type: "security" },
    { id: 3, action: "Changed site logo", user: "Admin User", time: "3 hours ago", type: "settings" },
    { id: 4, action: "Deleted 'Old Tool'", user: "Admin User", time: "Yesterday", type: "delete" },
];

const Settings = () => {
    const { branding, updateBranding } = useBranding();
    const { isMaintenanceMode, setMaintenanceMode } = useMaintenance();
    const [loading, setLoading] = useState(false);

    // Local state for form inputs
    const [siteName, setSiteName] = useState('');
    const [siteDescription, setSiteDescription] = useState('');

    // Sync with context on load
    useEffect(() => {
        if (branding) {
            setSiteName(branding.siteName);
            setSiteDescription(branding.siteDescription);
        }
    }, [branding]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateBranding('siteName', siteName);
            await updateBranding('siteDescription', siteDescription);
            toast.success("Settings saved successfully");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 mt-1">Configure global application settings and preferences.</p>
                </div>
                <Button onClick={handleSave} disabled={loading} className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 gap-2">
                    {loading ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                    Save Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-white border border-slate-200 p-1.5 rounded-2xl h-auto flex-wrap justify-start shadow-sm w-full sm:w-auto inline-flex">
                    <TabsTrigger value="general" className="gap-2 rounded-xl px-4 py-2.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                        <Globe size={16} /> General
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2 rounded-xl px-4 py-2.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                        <Shield size={16} /> Security
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="gap-2 rounded-xl px-4 py-2.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                        <Key size={16} /> Integrations
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="gap-2 rounded-xl px-4 py-2.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                        <History size={16} /> Activity
                    </TabsTrigger>
                    <TabsTrigger value="backups" className="gap-2 rounded-xl px-4 py-2.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                        <Database size={16} /> Backups
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">General Information</CardTitle>
                            <CardDescription>Basic site configuration and maintenance.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Site Name</Label>
                                    <Input
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Support Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <Input defaultValue="support@zentryx.com" disabled className="pl-10 bg-slate-100 border-slate-200 text-slate-500" />
                                    </div>
                                    <p className="text-xs text-slate-400">Contact developer to change.</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">Site Description (SEO)</Label>
                                <Textarea
                                    value={siteDescription}
                                    onChange={(e) => setSiteDescription(e.target.value)}
                                    className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-all resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-between p-5 border border-amber-200 rounded-xl bg-amber-50/50">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-amber-800 font-semibold">
                                        <AlertTriangle size={18} />
                                        Maintenance Mode
                                    </div>
                                    <p className="text-sm text-amber-700/80">Disable public access to the site. Only admins can access.</p>
                                </div>
                                <Switch
                                    checked={isMaintenanceMode}
                                    onCheckedChange={setMaintenanceMode}
                                    className="data-[state=checked]:bg-amber-500"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">Security Configuration</CardTitle>
                            <CardDescription>Manage access control and security protocols.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold text-slate-900">Two-Factor Authentication (2FA)</Label>
                                    <p className="text-sm text-slate-500">Require 2FA for all admin accounts.</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#3A7AFE]" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">IP Whitelist (Optional)</Label>
                                <Textarea
                                    placeholder="Enter IP addresses separated by commas..."
                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-all font-mono text-sm"
                                />
                                <p className="text-xs text-slate-500">Only allow admin access from these IPs.</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <Button variant="destructive" className="gap-2 shadow-lg shadow-red-500/20">
                                    <LogOut size={16} /> Force Logout All Users
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations (API Keys) */}
                <TabsContent value="integrations" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">API Keys & Integrations</CardTitle>
                            <CardDescription>Manage external service connections.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-3">
                                <Label className="text-slate-700 font-medium">OpenAI API Key</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <Input type="password" value="sk-........................" readOnly className="pl-10 bg-slate-50 border-slate-200 font-mono text-slate-500" />
                                    </div>
                                    <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">Update</Button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-700 font-medium">Google Analytics Measurement ID</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <Input value="G-XXXXXXXXXX" className="pl-10 bg-slate-50 border-slate-200 font-mono" />
                                    </div>
                                    <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">Update</Button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-700 font-medium">SMTP Server (SendGrid/Mailgun)</Label>
                                <div className="relative">
                                    <Server className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <Input placeholder="smtp.example.com" className="pl-10 bg-slate-50 border-slate-200" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Activity Logs */}
                <TabsContent value="logs" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">Activity Timeline</CardTitle>
                            <CardDescription>Recent actions performed by administrators.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="relative border-l border-slate-200 ml-3 space-y-8 pb-4">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="relative pl-8 group">
                                        <span className={cn(
                                            "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white transition-all group-hover:scale-125",
                                            log.type === 'security' ? "bg-red-500" :
                                                log.type === 'delete' ? "bg-orange-500" : "bg-[#3A7AFE]"
                                        )} />
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <p className="text-sm font-semibold text-slate-900">{log.action}</p>
                                            <span className="text-xs text-slate-400 font-medium">{log.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">by <span className="font-medium text-slate-700">{log.user}</span></p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4 border-dashed border-slate-300 text-slate-500 hover:text-[#3A7AFE] hover:border-[#3A7AFE] hover:bg-blue-50">View All Logs</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Backups */}
                <TabsContent value="backups" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">Data Backup & Export</CardTitle>
                            <CardDescription>Download system data or create full backups.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 border-slate-200 hover:border-blue-200 hover:bg-blue-50 group">
                                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                                        <Database size={24} />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-blue-700">Export Tools (JSON)</span>
                                </Button>
                                <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 group">
                                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 group-hover:scale-110 transition-transform">
                                        <Download size={24} />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-emerald-700">Export Users (CSV)</span>
                                </Button>
                                <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 border-slate-200 hover:border-purple-200 hover:bg-purple-50 group">
                                    <div className="p-3 bg-purple-100 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                                        <Server size={24} />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-purple-700">Full SQL Dump</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Settings;
