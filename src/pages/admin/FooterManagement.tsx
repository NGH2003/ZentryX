import React from 'react';
import { Layout, Link as LinkIcon, Trash2, Plus, Save, GripVertical, ExternalLink, Type } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBranding } from '@/contexts/BrandingContext';
import { toast } from 'sonner';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reorder, useDragControls } from "framer-motion";

interface LinkItemProps {
    link: { id: string; label: string; url: string };
    index: number;
    linksKey: 'column1Links' | 'column2Links' | 'column3Links';
    onChange: (column: 'column1Links' | 'column2Links' | 'column3Links', index: number, field: 'label' | 'url', value: string) => void;
    onRemove: (column: 'column1Links' | 'column2Links' | 'column3Links', index: number) => void;
}

const SortableLinkItem = ({ link, index, linksKey, onChange, onRemove }: LinkItemProps) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={link}
            id={link.id}
            dragListener={false}
            dragControls={controls}
            className="group relative bg-white rounded-xl border border-slate-200 p-3 shadow-sm hover:border-blue-200 hover:shadow-md transition-all mb-2"
        >
            <div
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-300 cursor-grab active:cursor-grabbing p-1 hover:text-slate-500 transition-colors"
                onPointerDown={(e) => controls.start(e)}
            >
                <GripVertical size={14} />
            </div>
            <div className="pl-6 grid gap-2">
                <div className="flex items-center gap-2">
                    <Type size={14} className="text-slate-400" />
                    <Input
                        value={link.label}
                        onChange={(e) => onChange(linksKey, index, 'label', e.target.value)}
                        placeholder="Label"
                        className="h-8 text-sm border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-slate-300 font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 border-t border-slate-50 pt-2">
                    <ExternalLink size={14} className="text-slate-400" />
                    <Input
                        value={link.url}
                        onChange={(e) => onChange(linksKey, index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="h-7 text-xs border-0 bg-transparent p-0 focus-visible:ring-0 text-slate-500 placeholder:text-slate-300 font-mono"
                    />
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemove(linksKey, index)}
            >
                <Trash2 size={14} />
            </Button>
        </Reorder.Item>
    );
};

const FooterManagement = () => {
    const { branding, updateBranding } = useBranding();

    const handleLinkChange = (column: 'column1Links' | 'column2Links' | 'column3Links', index: number, field: 'label' | 'url', value: string) => {
        const newLinks = [...branding.footerLinks[column]];
        newLinks[index] = { ...newLinks[index], [field]: value };

        updateBranding('footerLinks', {
            ...branding.footerLinks,
            [column]: newLinks
        });
    };

    const handleAddLink = (column: 'column1Links' | 'column2Links' | 'column3Links') => {
        const newLinks = [...branding.footerLinks[column], { id: crypto.randomUUID(), label: 'New Link', url: '#' }];
        updateBranding('footerLinks', {
            ...branding.footerLinks,
            [column]: newLinks
        });
    };

    const handleRemoveLink = (column: 'column1Links' | 'column2Links' | 'column3Links', index: number) => {
        const newLinks = branding.footerLinks[column].filter((_, i) => i !== index);
        updateBranding('footerLinks', {
            ...branding.footerLinks,
            [column]: newLinks
        });
    };

    const handleReorder = (column: 'column1Links' | 'column2Links' | 'column3Links', newOrder: any[]) => {
        updateBranding('footerLinks', {
            ...branding.footerLinks,
            [column]: newOrder
        });
    };

    const handleTitleChange = (column: 'column1Title' | 'column2Title' | 'column3Title', value: string) => {
        updateBranding('footerLinks', {
            ...branding.footerLinks,
            [column]: value
        });
    };

    const renderColumn = (titleKey: 'column1Title' | 'column2Title' | 'column3Title', linksKey: 'column1Links' | 'column2Links' | 'column3Links', titleLabel: string) => (
        <Card className="border-slate-200 shadow-sm h-full flex flex-col">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#3A7AFE]">
                        <Layout size={18} />
                    </div>
                    <div>
                        <CardTitle className="text-base font-bold text-slate-900">{titleLabel}</CardTitle>
                        <CardDescription>Manage links for this column.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col gap-4">
                <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Column Title</Label>
                    <Input
                        value={branding.footerLinks[titleKey]}
                        onChange={(e) => handleTitleChange(titleKey, e.target.value)}
                        placeholder="e.g. Company"
                        className="font-medium"
                    />
                </div>

                <div className="space-y-3 flex-1">
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Links</Label>
                    <Reorder.Group
                        axis="y"
                        values={branding.footerLinks[linksKey]}
                        onReorder={(newOrder) => handleReorder(linksKey, newOrder)}
                        className="space-y-2"
                    >
                        {branding.footerLinks[linksKey].map((link, index) => (
                            <SortableLinkItem
                                key={link.id}
                                link={link}
                                index={index}
                                linksKey={linksKey}
                                onChange={handleLinkChange}
                                onRemove={handleRemoveLink}
                            />
                        ))}
                    </Reorder.Group>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-dashed border-slate-300 text-slate-500 hover:text-[#3A7AFE] hover:border-[#3A7AFE] hover:bg-blue-50 gap-2 mt-2"
                        onClick={() => handleAddLink(linksKey)}
                    >
                        <Plus size={14} /> Add Link
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Footer Management</h1>
                    <p className="text-slate-500 mt-1">Customize the footer content, links, and layout.</p>
                </div>
                <Button className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 gap-2" onClick={() => toast.success("Footer settings saved!")}>
                    <Save size={16} /> Save Changes
                </Button>
            </div>

            {/* Footer Text Section */}
            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900">Footer Content</CardTitle>
                    <CardDescription>General information displayed in the footer.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-3">
                        <Label className="text-slate-700 font-medium">Footer Description</Label>
                        <Textarea
                            placeholder="Enter a brief description about your site..."
                            className="min-h-[80px] bg-slate-50 border-slate-200 focus:bg-white transition-all resize-none"
                            value={branding.footerText || ''}
                            onChange={(e) => updateBranding('footerText', e.target.value)}
                        />
                        <p className="text-xs text-slate-500">This text appears below your logo in the footer.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {renderColumn('column1Title', 'column1Links', 'Column 1')}
                {renderColumn('column2Title', 'column2Links', 'Column 2')}
                {renderColumn('column3Title', 'column3Links', 'Column 3')}
            </div>
        </div>
    );
};

export default FooterManagement;
