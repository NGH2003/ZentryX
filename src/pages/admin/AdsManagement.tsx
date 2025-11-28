import React, { useState } from 'react';
import {
    Monitor,
    Smartphone,
    Layout,
    Plus,
    Trash2,
    Eye,
    Code,
    CheckCircle,
    XCircle,
    AlertCircle,
    Copy,
    ExternalLink,
    MousePointerClick
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { useAds, AdsConfig } from '@/contexts/AdsContext';

const AdsManagement = () => {
    const { config, updateSlot } = useAds();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSlotKey, setEditingSlotKey] = useState<keyof AdsConfig['slots'] | null>(null);
    const [editingCode, setEditingCode] = useState('');

    // Helper to map context slots to display format
    const slotsList = [
        {
            key: 'header' as const,
            name: "Homepage Header Banner",
            location: "Homepage (Top)",
            type: "Banner (728x90)",
            data: config.slots.header,
            icon: Layout
        },
        {
            key: 'sidebar' as const,
            name: "Sidebar Square",
            location: "Tools Sidebar",
            type: "Square (300x250)",
            data: config.slots.sidebar,
            icon: Monitor
        },
        {
            key: 'footer' as const,
            name: "Tool Footer",
            location: "Tool Page (Bottom)",
            type: "Banner (728x90)",
            data: config.slots.footer,
            icon: Layout
        },
        {
            key: 'toolPage' as const,
            name: "Tool Page Sponsor",
            location: "Tool Page (Top)",
            type: "Custom",
            data: config.slots.toolPage,
            icon: Smartphone
        }
    ];

    const handleToggleStatus = (key: keyof AdsConfig['slots']) => {
        const slot = config.slots[key];
        updateSlot(key, { enabled: !slot.enabled });
        toast.success(`Ad slot ${!slot.enabled ? 'enabled' : 'disabled'}`);
    };

    const handleEditClick = (key: keyof AdsConfig['slots']) => {
        setEditingSlotKey(key);
        setEditingCode(config.slots[key].code);
        setIsEditModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSlotKey) return;

        updateSlot(editingSlotKey, { code: editingCode });
        setIsEditModalOpen(false);
        toast.success("Ad slot updated successfully");
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ads Management</h1>
                    <p className="text-slate-500 mt-1">Manage ad placements and monetization scripts across your platform.</p>
                </div>
                {/* <Button className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 gap-2 rounded-xl">
                    <Plus size={18} /> Create Ad Slot
                </Button> */}
            </div>

            {/* Ad Slots Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {slotsList.map((slot) => (
                    <Card key={slot.key} className={cn(
                        "border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md rounded-2xl overflow-hidden group",
                        !slot.data.enabled && "opacity-80 bg-slate-50/50"
                    )}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b border-slate-100 bg-white">
                            <div className="flex gap-4">
                                <div className={cn(
                                    "p-3 rounded-xl transition-colors",
                                    slot.data.enabled ? "bg-blue-50 text-[#3A7AFE]" : "bg-slate-100 text-slate-400"
                                )}>
                                    <slot.icon size={24} />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        {slot.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2 text-sm">
                                        <Badge variant="outline" className="rounded-md bg-slate-50 border-slate-200 text-slate-600 font-normal">
                                            {slot.location}
                                        </Badge>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-slate-500">{slot.type}</span>
                                    </CardDescription>
                                </div>
                            </div>
                            <Switch
                                checked={slot.data.enabled}
                                onCheckedChange={() => handleToggleStatus(slot.key)}
                                className="data-[state=checked]:bg-emerald-500"
                            />
                        </CardHeader>
                        <CardContent className="p-6 bg-white">
                            {/* Preview Box */}
                            <div className="h-40 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 mb-6 relative overflow-hidden group/preview transition-colors hover:border-[#3A7AFE]/30 hover:bg-blue-50/10">
                                <div className="flex flex-col items-center gap-2 transition-transform duration-300 group-hover/preview:scale-105">
                                    <Layout size={32} className="opacity-50" />
                                    <span className="text-xs font-medium uppercase tracking-wider">Ad Preview Area</span>
                                </div>

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center gap-3 opacity-0 group-hover/preview:opacity-100 transition-all duration-300">
                                    <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 border-none font-medium shadow-lg" onClick={() => handleEditClick(slot.key)}>
                                        <Code size={16} className="mr-2 text-[#3A7AFE]" /> Edit Code
                                    </Button>
                                </div>
                            </div>

                            {/* Stats (Mock for now as context doesn't have stats yet) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                                        <Eye size={14} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Impressions</span>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">--</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                                        <MousePointerClick size={14} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Est. CTR</span>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">--</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-2xl gap-0">
                    <DialogHeader className="p-6 pb-2 bg-white">
                        <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Code className="text-[#3A7AFE]" />
                            Configure Ad Slot
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 text-base">
                            Paste your ad network code (AdSense, etc.) below.
                        </DialogDescription>
                    </DialogHeader>

                    {editingSlotKey && (
                        <form onSubmit={handleSave} className="flex flex-col h-full">
                            <div className="px-6 py-4 space-y-4 bg-white">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-slate-700 font-medium">Slot Name</Label>
                                    <Input
                                        id="name"
                                        value={slotsList.find(s => s.key === editingSlotKey)?.name}
                                        disabled
                                        className="bg-slate-50 border-slate-200 text-slate-500 font-medium"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="code" className="text-slate-700 font-medium">Ad Script / HTML</Label>
                                        <div className="flex items-center gap-2">
                                            {editingCode.includes('<script') ? (
                                                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                                    <CheckCircle size={12} /> Valid Script
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                                    <AlertCircle size={12} /> No Script Detected
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-[#3A7AFE]/20 focus-within:border-[#3A7AFE] transition-all">
                                        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50"></div>
                                        </div>
                                        <Textarea
                                            id="code"
                                            value={editingCode}
                                            onChange={(e) => setEditingCode(e.target.value)}
                                            className="font-mono text-sm min-h-[300px] pt-10 bg-slate-50 text-slate-800 border-none focus-visible:ring-0 resize-none leading-relaxed"
                                            placeholder="<script async src=...></script>"
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="p-6 pt-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between sm:justify-between">
                                <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-700 hover:bg-slate-200/50">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 px-6">
                                    Save Configuration
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdsManagement;
