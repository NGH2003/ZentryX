import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PanelBottom, Save, Palette } from "lucide-react";

interface FooterTabProps {
    localBranding: any;
    updateBranding: (key: string, value: any) => void;
    handleSaveBranding: () => void;
}

export function FooterTab({ localBranding, updateBranding, handleSaveBranding }: FooterTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-gray-50/50">
                        <CardTitle className="flex items-center gap-2">
                            <PanelBottom className="w-5 h-5 text-blue-600" />
                            Footer Customization
                        </CardTitle>
                        <CardDescription>Customize the appearance and content of your website footer</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                        {/* Footer Logo */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-base font-semibold">Footer Logo</Label>
                                <div className="flex items-center gap-2">
                                    <Label className="text-xs text-muted-foreground">Width (px):</Label>
                                    <Input
                                        type="number"
                                        value={localBranding.footerLogoWidth || 120}
                                        onChange={(e) => updateBranding("footerLogoWidth", parseInt(e.target.value) || 120)}
                                        className="w-20 h-8"
                                        min={20}
                                        max={300}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        value={localBranding.footerLogo || ""}
                                        onChange={(e) => updateBranding("footerLogo", e.target.value)}
                                        placeholder="https://example.com/footer-logo.png"
                                        className="mb-2"
                                    />
                                    <p className="text-xs text-muted-foreground">Logo displayed in the footer (usually white/light version)</p>
                                </div>
                                <div className="w-32 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-900 overflow-hidden shrink-0">
                                    {localBranding.footerLogo ? (
                                        <img
                                            src={localBranding.footerLogo}
                                            alt="Footer Logo"
                                            style={{ width: `${Math.min(localBranding.footerLogoWidth || 120, 100)}px` }}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-500">No Logo</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Colors */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                Background Gradient
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Start Color</Label>
                                    <div className="flex gap-2">
                                        <div className="relative w-12 h-10 overflow-hidden rounded-md border shadow-sm">
                                            <Input
                                                type="color"
                                                value={localBranding.footerBgColor1 || "#111827"}
                                                onChange={(e) => updateBranding("footerBgColor1", e.target.value)}
                                                className="absolute -top-2 -left-2 w-16 h-16 p-0 border-0 cursor-pointer"
                                            />
                                        </div>
                                        <Input
                                            type="text"
                                            value={localBranding.footerBgColor1 || "#111827"}
                                            onChange={(e) => updateBranding("footerBgColor1", e.target.value)}
                                            placeholder="#111827"
                                            className="font-mono"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>End Color</Label>
                                    <div className="flex gap-2">
                                        <div className="relative w-12 h-10 overflow-hidden rounded-md border shadow-sm">
                                            <Input
                                                type="color"
                                                value={localBranding.footerBgColor2 || "#111827"}
                                                onChange={(e) => updateBranding("footerBgColor2", e.target.value)}
                                                className="absolute -top-2 -left-2 w-16 h-16 p-0 border-0 cursor-pointer"
                                            />
                                        </div>
                                        <Input
                                            type="text"
                                            value={localBranding.footerBgColor2 || "#111827"}
                                            onChange={(e) => updateBranding("footerBgColor2", e.target.value)}
                                            placeholder="#111827"
                                            className="font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Content */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold">Footer Text</Label>
                            <Textarea
                                value={localBranding.footerText || ""}
                                onChange={(e) => updateBranding("footerText", e.target.value)}
                                placeholder="© 2024 ToolBox. All rights reserved."
                                rows={4}
                                className="resize-none"
                            />
                            <p className="text-xs text-muted-foreground">Text displayed at the bottom of the footer</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6">
                <Card className="border-0 shadow-lg sticky top-6">
                    <CardHeader>
                        <CardTitle>Footer Preview</CardTitle>
                        <CardDescription>Approximate visualization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div
                            className="rounded-xl p-6 text-white space-y-4"
                            style={{
                                background: `linear-gradient(to right, ${localBranding.footerBgColor1 || '#111827'}, ${localBranding.footerBgColor2 || '#111827'})`
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                {localBranding.footerLogo ? (
                                    <img
                                        src={localBranding.footerLogo}
                                        alt="Footer Logo"
                                        style={{ width: `${Math.min(localBranding.footerLogoWidth || 120, 80)}px` }}
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-white/20 rounded animate-pulse" />
                                )}
                                <span className="font-bold text-lg">{localBranding.siteName || "Site Name"}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-6">
                                <div className="space-y-2">
                                    <div className="h-2 w-20 bg-white/20 rounded" />
                                    <div className="h-2 w-16 bg-white/20 rounded" />
                                    <div className="h-2 w-24 bg-white/20 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-16 bg-white/20 rounded" />
                                    <div className="h-2 w-20 bg-white/20 rounded" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 text-xs text-gray-400">
                                {localBranding.footerText || "© 2024 ToolBox. All rights reserved."}
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
