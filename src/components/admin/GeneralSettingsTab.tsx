import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Bell, Lock, Globe, Mail } from "lucide-react";

export function GeneralSettingsTab() {
    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-gray-600" />
                        General Settings
                    </CardTitle>
                    <CardDescription>Manage core application configuration</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    {/* Notifications */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <Bell className="w-4 h-4 text-blue-500" />
                            Notifications
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-white">
                                <div>
                                    <Label className="font-medium">Email Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Receive emails about critical system events</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-white">
                                <div>
                                    <Label className="font-medium">User Signups</Label>
                                    <p className="text-sm text-muted-foreground">Notify when a new user registers</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Security */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4 text-green-500" />
                            Security
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-white">
                                <div>
                                    <Label className="font-medium">Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">Enforce 2FA for all admin accounts</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-white">
                                <div>
                                    <Label className="font-medium">Public Registration</Label>
                                    <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Email Settings */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-purple-500" />
                            Email Configuration
                        </h3>
                        <div className="grid gap-4">
                            <div className="p-4 border rounded-xl bg-gray-50 text-center">
                                <p className="text-sm text-muted-foreground mb-4">SMTP settings are configured in environment variables</p>
                                <Button variant="outline" size="sm">View Configuration</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
