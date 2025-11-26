import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Palette, Image as ImageIcon, Type, Save } from "lucide-react";

interface BrandingTabProps {
    localBranding: any;
    updateBranding: (key: string, value: any) => void;
    handleSaveBranding: () => void;
}

export function BrandingTab({ localBranding, updateBranding, handleSaveBranding }: BrandingTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Identity Section */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-gray-50/50">
                        <CardTitle className="flex items-center gap-2">
                            <Type className="w-5 h-5 text-blue-600" />
                            Brand Identity
                        </CardTitle>
                        <CardDescription>Configure your site's name and tagline</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Site Name</Label>
                                <Input
                                    value={localBranding.siteName}
                                    onChange={(e) => updateBranding("siteName", e.target.value)}
                                    placeholder="e.g. ToolBox"
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tagline</Label>
                                <Input
                                    value={localBranding.tagline}
                                    onChange={(e) => updateBranding("tagline", e.target.value)}
                                    placeholder="e.g. The best tools for everyone"
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50">
                            <div>
                                <Label className="font-semibold text-base">Show Site Name</Label>
                                <p className="text-sm text-muted-foreground">Display text name alongside logo in navigation</p>
                            </div>
                            <Switch
                                checked={localBranding.showSiteName}
                                onCheckedChange={(checked) => updateBranding("showSiteName", checked)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Assets Section */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-gray-50/50">
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-purple-600" />
                            Brand Assets
                        </CardTitle>
                        <CardDescription>Manage logos and icons</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                        {/* Main Logo */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-base font-semibold">Main Logo</Label>
                                <div className="flex items-center gap-2">
                                    <Label className="text-xs text-muted-foreground">Width (px):</Label>
                                    <Input
                                        type="number"
                                        value={localBranding.logoWidth}
                                        onChange={(e) => updateBranding("logoWidth", parseInt(e.target.value) || 120)}
                                        className="w-20 h-8"
                                        min={20}
                                        max={300}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        value={localBranding.logo || ""}
                                        onChange={(e) => updateBranding("logo", e.target.value)}
                                        placeholder="https://example.com/logo.png"
                                        className="mb-2"
                                    />
                                    <p className="text-xs text-muted-foreground">Enter the URL of your logo image (PNG or SVG recommended)</p>
                                </div>
                                <div className="w-32 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                                    {localBranding.logo ? (
                                        <img
                                            src={localBranding.logo}
                                            alt="Logo Preview"
                                            style={{ width: `${Math.min(localBranding.logoWidth, 100)}px` }}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">No Logo</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Favicon */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold">Site Icon (Favicon)</Label>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        value={localBranding.siteIcon || ""}
                                        onChange={(e) => updateBranding("siteIcon", e.target.value)}
                                        placeholder="https://example.com/icon.png"
                                        className="mb-2"
                                    />
                                    <p className="text-xs text-muted-foreground">Square image used for browser tabs and mobile icons</p>
                                </div>
                                <div className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                                    {localBranding.siteIcon ? (
                                        <img
                                            src={localBranding.siteIcon}
                                            alt="Icon Preview"
                                            className="w-8 h-8 object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">No Icon</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Preview & Save */}
            <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white sticky top-6">
                    <CardHeader>
                        <CardTitle className="text-white">Live Preview</CardTitle>
                        <CardDescription className="text-gray-400">How your brand looks in the navbar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                                {localBranding.logo ? (
                                    <img
                                        src={localBranding.logo}
                                        alt="Logo"
                                        style={{ width: `${Math.min(localBranding.logoWidth, 100)}px` }}
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                                )}
                                {localBranding.showSiteName && (
                                    <span className="font-bold text-xl text-gray-900">{localBranding.siteName || "Site Name"}</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-400">Browser Tab Preview:</p>
                            <div className="flex items-center gap-2 p-2 bg-gray-700 rounded-t-lg w-3/4">
                                {localBranding.siteIcon ? (
                                    <img src={localBranding.siteIcon} className="w-4 h-4 rounded-sm" />
                                ) : (
                                    <div className="w-4 h-4 bg-gray-500 rounded-sm" />
                                )}
                                <span className="text-xs text-gray-200 truncate">
                                    {localBranding.siteName || "Site Name"} - {localBranding.tagline || "Home"}
                                </span>
                            </div>
                        </div>

                        <Button
                            onClick={handleSaveBranding}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20"
                            size="lg"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
