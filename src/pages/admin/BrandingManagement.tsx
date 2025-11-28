import React from 'react';
import { Palette, Upload, Globe, LayoutTemplate, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useBranding } from "@/contexts/BrandingContext";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const BrandingManagement = () => {
    const { branding, updateBranding } = useBranding();

    const handleSaveBranding = () => {
        // In a real app, this would trigger a save to the backend if not auto-saved
        toast.success("Branding settings saved successfully", {
            description: "Your changes have been applied to the live site."
        });
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Branding & Identity</h1>
                    <p className="text-slate-500 mt-1">Customize your site's visual appearance and assets.</p>
                </div>
                <Button onClick={handleSaveBranding} className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 gap-2">
                    <Check size={16} /> Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Settings */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Identity Section */}
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-[#3A7AFE]">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Site Identity</CardTitle>
                                    <CardDescription>Basic information about your website.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-slate-700 font-medium">Site Name</Label>
                                    <Input
                                        value={branding.siteName}
                                        onChange={(e) => updateBranding('siteName', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                        placeholder="e.g. ZentryX"
                                    />
                                    <p className="text-xs text-slate-500">Appears in the browser tab and footer.</p>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-slate-700 font-medium">Tagline</Label>
                                    <Input
                                        value={branding.tagline}
                                        onChange={(e) => updateBranding('tagline', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                        placeholder="e.g. Smart Tools. Zero Effort."
                                    />
                                    <p className="text-xs text-slate-500">A short description of your site.</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium text-slate-900">Show Site Name in Header</Label>
                                    <p className="text-sm text-slate-500">Toggle visibility of text next to the logo.</p>
                                </div>
                                <Switch
                                    checked={branding.showSiteName}
                                    onCheckedChange={(checked) => updateBranding('showSiteName', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assets Section */}
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <Upload size={20} />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Brand Assets</CardTitle>
                                    <CardDescription>Upload your logos and icons.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-slate-700 font-medium">Main Logo</Label>
                                    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors cursor-pointer group">
                                        <ImageUpload
                                            value={branding.logo}
                                            onChange={(val) => {
                                                updateBranding('logo', val);
                                                toast.success("Logo updated");
                                            }}
                                            label="Upload Logo"
                                            aspectRatio="wide"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 text-center">Recommended: PNG or SVG, max 2MB.</p>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 font-medium">Favicon / Site Icon</Label>
                                    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors cursor-pointer group">
                                        <ImageUpload
                                            value={branding.favicon}
                                            onChange={(val) => {
                                                updateBranding('favicon', val);
                                                updateBranding('siteIcon', val); // Sync for now
                                                toast.success("Icon updated");
                                            }}
                                            label="Upload Icon"
                                            aspectRatio="square"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 text-center">Recommended: 512x512 PNG.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Colors Section */}
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                    <Palette size={20} />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Color Palette</CardTitle>
                                    <CardDescription>Define your brand's primary colors.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-slate-700 font-medium">Primary Color</Label>
                                    <div className="flex gap-3 items-center">
                                        <div className="relative group">
                                            <div
                                                className="w-12 h-12 rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-transform hover:scale-105"
                                                style={{ backgroundColor: branding.primaryColor }}
                                            />
                                            <input
                                                type="color"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                value={branding.primaryColor}
                                                onChange={(e) => updateBranding('primaryColor', e.target.value)}
                                            />
                                        </div>
                                        <Input
                                            value={branding.primaryColor}
                                            onChange={(e) => updateBranding('primaryColor', e.target.value)}
                                            className="font-mono uppercase"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">Used for buttons, links, and active states.</p>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 font-medium">Secondary Color</Label>
                                    <div className="flex gap-3 items-center">
                                        <div className="relative group">
                                            <div
                                                className="w-12 h-12 rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-transform hover:scale-105"
                                                style={{ backgroundColor: branding.secondaryColor }}
                                            />
                                            <input
                                                type="color"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                value={branding.secondaryColor}
                                                onChange={(e) => updateBranding('secondaryColor', e.target.value)}
                                            />
                                        </div>
                                        <Input
                                            value={branding.secondaryColor}
                                            onChange={(e) => updateBranding('secondaryColor', e.target.value)}
                                            className="font-mono uppercase"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">Used for accents and secondary actions.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Preview */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <LayoutTemplate size={18} className="text-slate-400" />
                            <h3 className="font-semibold text-slate-900">Live Preview</h3>
                        </div>

                        {/* Preview Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                            {/* Mock Header */}
                            <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 bg-white/80 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    {branding.logo ? (
                                        <img src={branding.logo} alt="Logo" className="h-8 object-contain" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">Z</div>
                                    )}
                                    {branding.showSiteName && (
                                        <span className="font-bold text-slate-900">{branding.siteName}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
                                    <div className="w-12 h-2 bg-slate-100 rounded-full"></div>
                                </div>
                            </div>

                            {/* Mock Hero */}
                            <div className="p-8 text-center space-y-4 bg-slate-50/50">
                                <h2 className="text-2xl font-bold text-slate-900">Welcome to {branding.siteName}</h2>
                                <p className="text-slate-500 text-sm">{branding.tagline}</p>
                                <div className="flex justify-center gap-3 pt-2">
                                    <Button style={{ backgroundColor: branding.primaryColor }} className="shadow-lg shadow-blue-500/20">Get Started</Button>
                                    <Button variant="outline" className="bg-white">Learn More</Button>
                                </div>
                            </div>

                            {/* Mock Content */}
                            <div className="p-6 space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">🚀</div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                                        <div className="h-3 w-1/2 bg-slate-50 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">✨</div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                                        <div className="h-3 w-1/2 bg-slate-50 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                            <p className="flex items-start gap-2">
                                <span className="text-xl">💡</span>
                                This preview shows how your branding choices will affect key areas of your website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingManagement;
