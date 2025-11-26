import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";

interface ToolEditDialogProps {
    tool: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ToolEditDialog({ tool, open, onOpenChange }: ToolEditDialogProps) {
    const [formData, setFormData] = useState({
        name: tool?.name || '',
        description: tool?.description || '',
        category: tool?.category || '',
        icon: tool?.icon || '',
        featured: tool?.featured || false
    });

    // Update form data when tool changes
    useState(() => {
        if (tool) {
            setFormData({
                name: tool.name,
                description: tool.description,
                category: tool.category,
                icon: tool.icon,
                featured: tool.featured || false
            });
        }
    });

    const handleSave = () => {
        toast.success(`Tool "${formData.name}" updated successfully!`);
        onOpenChange(false);
        // TODO: Implement actual database update
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Edit Tool
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to the tool. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Tool Name */}
                    <div className="space-y-2">
                        <Label htmlFor="tool-name" className="text-sm font-semibold">
                            Tool Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="tool-name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter tool name"
                            className="h-11"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="tool-description" className="text-sm font-semibold">
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="tool-description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter tool description"
                            rows={3}
                            className="resize-none"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="tool-category" className="text-sm font-semibold">
                            Category <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="tool-category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="e.g., Text Tools, Image Tools"
                            className="h-11"
                        />
                    </div>

                    {/* Icon */}
                    <div className="space-y-2">
                        <Label htmlFor="tool-icon" className="text-sm font-semibold">
                            Icon (Emoji)
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="tool-icon"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="🔧"
                                className="h-11"
                                maxLength={2}
                            />
                            <div className="w-11 h-11 border rounded-md flex items-center justify-center text-2xl bg-gray-50">
                                {formData.icon || '🔧'}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Enter an emoji to represent this tool
                        </p>
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                        <div>
                            <Label htmlFor="tool-featured" className="text-sm font-semibold">Featured Tool</Label>
                            <p className="text-xs text-gray-600">Show this tool in the featured section</p>
                        </div>
                        <Switch
                            id="tool-featured"
                            checked={formData.featured}
                            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                    </div>

                    {/* Preview */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Preview</Label>
                        <div className="p-4 border-2 border-dashed rounded-xl bg-gray-50">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{formData.icon || '🔧'}</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold">{formData.name || 'Tool Name'}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {formData.description || 'Tool description will appear here'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                                            {formData.category || 'Category'}
                                        </span>
                                        {formData.featured && (
                                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={!formData.name || !formData.description || !formData.category}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
