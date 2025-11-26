import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Copy, Trash2, Eye, HelpCircle, Globe, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface AdsTabProps {
    adsConfig: any;
    updateConfig: (config: any) => void;
    updateSlot: (key: string, data: any) => void;
}

export function AdsTab({ adsConfig, updateConfig, updateSlot }: AdsTabProps) {
    const enabledAdsCount = Object.values(adsConfig.slots).filter((slot: any) => slot.enabled).length;
    const totalSlots = Object.keys(adsConfig.slots).length;

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-blue-600 mb-1">Total Slots</div>
                        <div className="text-3xl font-bold text-gray-900">{totalSlots}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-green-600 mb-1">Active</div>
                        <div className="text-3xl font-bold text-gray-900">{enabledAdsCount}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-600 mb-1">Provider</div>
                        <div className="text-xl font-bold text-gray-900 capitalize truncate">{adsConfig.provider}</div>
                    </CardContent>
                </Card>
                <Card className={`bg-gradient-to-br ${adsConfig.enabled ? 'from-green-50 border-green-100' : 'from-red-50 border-red-100'} to-white`}>
                    <CardContent className="p-6">
                        <div className={`text-sm font-medium ${adsConfig.enabled ? 'text-green-600' : 'text-red-600'} mb-1`}>Global Status</div>
                        <div className="text-xl font-bold text-gray-900">{adsConfig.enabled ? 'Enabled' : 'Disabled'}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Settings & Help */}
                <div className="space-y-8 lg:col-span-1">
                    {/* Global Settings */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gray-50/50 border-b">
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-600" />
                                Global Settings
                            </CardTitle>
                            <CardDescription>Configure site-wide ad settings</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50">
                                <div>
                                    <Label className="font-semibold text-base">Enable Ads</Label>
                                    <p className="text-xs text-muted-foreground">Toggle all ads on/off</p>
                                </div>
                                <Switch
                                    checked={adsConfig.enabled}
                                    onCheckedChange={(checked) => {
                                        const newConfig = { ...adsConfig, enabled: checked };
                                        updateConfig(newConfig);
                                        toast.success(`Ads ${checked ? 'enabled' : 'disabled'} globally`);
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Ad Provider</Label>
                                <select
                                    value={adsConfig.provider}
                                    onChange={(e) => {
                                        const newConfig = { ...adsConfig, provider: e.target.value as "google" | "custom" };
                                        updateConfig(newConfig);
                                        toast.success(`Ad provider changed to ${e.target.value}`);
                                    }}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                >
                                    <option value="google">Google AdSense</option>
                                    <option value="custom">Custom HTML/JS</option>
                                </select>
                            </div>

                            {adsConfig.provider === "google" && (
                                <div className="space-y-3">
                                    <Label>Publisher ID</Label>
                                    <Input
                                        value={adsConfig.googleAdSenseId}
                                        onChange={(e) => {
                                            const newConfig = { ...adsConfig, googleAdSenseId: e.target.value };
                                            updateConfig(newConfig);
                                        }}
                                        placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                                        className="font-mono bg-gray-50"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Found in your AdSense account settings
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <HelpCircle className="w-5 h-5" />
                                Quick Guide
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-blue-50">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-white">Google AdSense</h4>
                                <ol className="list-decimal list-inside text-sm space-y-1 opacity-90">
                                    <li>Get Publisher ID from AdSense</li>
                                    <li>Create ad units for each slot</li>
                                    <li>Paste code in slots on the right</li>
                                </ol>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-white">Custom Ads</h4>
                                <ol className="list-decimal list-inside text-sm space-y-1 opacity-90">
                                    <li>Get HTML/JS from ad network</li>
                                    <li>Paste directly into slots</li>
                                    <li>Use preview to verify</li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Ad Slots */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <LayoutTemplate className="w-5 h-5 text-purple-600" />
                            Ad Placements
                        </h3>
                        <Badge variant="outline">{totalSlots} Slots Available</Badge>
                    </div>

                    <div className="grid gap-6">
                        {Object.entries(adsConfig.slots).map(([key, slot]: [string, any], index) => {
                            const slotInfo: any = {
                                header: { size: "728x90", location: "Top of every page", color: "blue" },
                                sidebar: { size: "300x250", location: "Right sidebar", color: "green" },
                                footer: { size: "728x90", location: "Bottom of every page", color: "gray" },
                                toolPage: { size: "Flexible", location: "Individual tool pages", color: "orange" },
                            }[key] || { size: "Custom", location: "Custom location", color: "purple" };

                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${slot.enabled ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                                        <CardContent className="p-6 space-y-4">
                                            {/* Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className={`w-12 h-12 rounded-xl bg-${slotInfo.color}-100 flex items-center justify-center shrink-0`}>
                                                        <Zap className={`w-6 h-6 text-${slotInfo.color}-600`} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span>{slotInfo.location}</span>
                                                            <span>•</span>
                                                            <Badge variant="secondary" className="text-xs font-normal">{slotInfo.size}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={slot.enabled}
                                                    onCheckedChange={(checked) => {
                                                        updateSlot(key, { enabled: checked });
                                                        toast.success(`${key} ad slot ${checked ? 'enabled' : 'disabled'}`);
                                                    }}
                                                />
                                            </div>

                                            {/* Editor */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Ad Code</Label>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(slot.code);
                                                                toast.success("Copied to clipboard");
                                                            }}
                                                        >
                                                            <Copy className="w-3 h-3" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => {
                                                                updateSlot(key, { code: "" });
                                                                toast.success("Code cleared");
                                                            }}
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Textarea
                                                    value={slot.code}
                                                    onChange={(e) => updateSlot(key, { code: e.target.value })}
                                                    placeholder={`Paste your ${adsConfig.provider === 'google' ? 'AdSense' : 'ad'} code here...`}
                                                    className="font-mono text-xs bg-gray-900 text-gray-100 min-h-[100px] resize-y border-0 focus-visible:ring-offset-0"
                                                    spellCheck={false}
                                                />
                                            </div>

                                            {/* Preview */}
                                            {slot.enabled && slot.code && (
                                                <div className="pt-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
                                                    </div>
                                                    <div className="p-4 border-2 border-dashed rounded-lg bg-gray-50 flex justify-center overflow-hidden">
                                                        <div dangerouslySetInnerHTML={{ __html: slot.code }} />
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
