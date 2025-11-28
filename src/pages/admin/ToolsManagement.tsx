import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    CheckSquare,
    Square,
    ArrowUpDown,
    Star,
    Download,
    Plus,
    Loader2,
    Wrench,
    LayoutGrid
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Type definition matching Supabase table
interface Tool {
    id: number;
    name: string;
    description: string;
    category: string;
    icon: string;
    path: string;
    uses: number;
    featured: boolean;
    tags: string[];
}

const ToolsManagement = () => {
    // State
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All'); // 'All', 'Featured', 'Standard'
    const [selectedTools, setSelectedTools] = useState<number[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tool; direction: 'asc' | 'desc' } | null>(null);

    // Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState<Tool | null>(null);
    const [newTool, setNewTool] = useState<Partial<Tool>>({
        name: '',
        description: '',
        category: 'General',
        icon: '🔧',
        path: '/',
        uses: 0,
        featured: false,
        tags: []
    });

    // Load Tools
    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        setIsLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from('tools')
                .select('*')
                .order('id', { ascending: true });

            if (data) {
                setTools(data);
            } else if (error) {
                console.error("Error fetching tools:", error);
                toast.error("Failed to load tools");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Derived Data
    const categories = useMemo(() => ['All', ...Array.from(new Set(tools.map(t => t.category)))], [tools]);

    const filteredTools = useMemo(() => {
        let result = [...tools];

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(query) ||
                t.description?.toLowerCase().includes(query) ||
                t.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Category Filter
        if (selectedCategory !== 'All') {
            result = result.filter(t => t.category === selectedCategory);
        }

        // Status Filter (Featured)
        if (selectedStatus !== 'All') {
            const isFeatured = selectedStatus === 'Featured';
            result = result.filter(t => t.featured === isFeatured);
        }

        // Sorting
        if (sortConfig) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [tools, searchQuery, selectedCategory, selectedStatus, sortConfig]);

    // Handlers
    const handleSort = (key: keyof Tool) => {
        setSortConfig(current => ({
            key,
            direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const toggleSelectAll = () => {
        if (selectedTools.length === filteredTools.length) {
            setSelectedTools([]);
        } else {
            setSelectedTools(filteredTools.map(t => t.id));
        }
    };

    const toggleSelectTool = (id: number) => {
        setSelectedTools(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this tool?')) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase as any)
                    .from('tools')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                setTools(prev => prev.filter(t => t.id !== id));
                toast.success("Tool deleted successfully");
            } catch (error) {
                console.error("Error deleting tool:", error);
                toast.error("Failed to delete tool");
            }
        }
    };

    const handleBulkDelete = async () => {
        if (confirm(`Are you sure you want to delete ${selectedTools.length} tools?`)) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase as any)
                    .from('tools')
                    .delete()
                    .in('id', selectedTools);

                if (error) throw error;

                setTools(prev => prev.filter(t => !selectedTools.includes(t.id)));
                setSelectedTools([]);
                toast.success("Tools deleted successfully");
            } catch (error) {
                console.error("Error deleting tools:", error);
                toast.error("Failed to delete tools");
            }
        }
    };

    const handleEditClick = (tool: Tool) => {
        setEditingTool(tool);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTool) return;

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase as any)
                .from('tools')
                .update({
                    name: editingTool.name,
                    description: editingTool.description,
                    category: editingTool.category,
                    featured: editingTool.featured,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingTool.id);

            if (error) throw error;

            setTools(prev => prev.map(t => t.id === editingTool.id ? editingTool : t));
            setIsEditModalOpen(false);
            setEditingTool(null);
            toast.success("Tool updated successfully");
        } catch (error) {
            console.error("Error updating tool:", error);
            toast.error("Failed to update tool");
        }
    };

    const handleAddTool = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from('tools')
                .insert([{
                    ...newTool,
                    tags: newTool.tags || [],
                    uses: 0
                }])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setTools(prev => [...prev, data]);
                setIsAddModalOpen(false);
                setNewTool({
                    name: '',
                    description: '',
                    category: 'General',
                    icon: '🔧',
                    path: '/',
                    uses: 0,
                    featured: false,
                    tags: []
                });
                toast.success("Tool added successfully");
            }
        } catch (error) {
            console.error("Error adding tool:", error);
            toast.error("Failed to add tool");
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tools Management</h1>
                    <p className="text-slate-500 mt-1">Manage, edit, and organize all system tools.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm">
                        <Download size={16} /> Export
                    </Button>
                    <Button className="gap-2 bg-[#3A7AFE] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-500/25" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={16} /> Add New Tool
                    </Button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
                <div className="flex flex-1 gap-4 w-full">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A7AFE] transition-colors" size={18} />
                        <Input
                            placeholder="Search tools by name, tag, or description..."
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        {/* Category Filter */}
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[160px] bg-white border-slate-200">
                                <div className="flex items-center gap-2">
                                    <LayoutGrid size={14} className="text-slate-500" />
                                    <SelectValue placeholder="Category" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-[140px] bg-white border-slate-200">
                                <div className="flex items-center gap-2">
                                    <Filter size={14} className="text-slate-500" />
                                    <SelectValue placeholder="Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="Featured">Featured</SelectItem>
                                <SelectItem value="Standard">Standard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedTools.length > 0 && (
                    <div className="flex items-center gap-3 animate-fade-in bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                        <span className="text-sm font-medium text-blue-700">{selectedTools.length} selected</span>
                        <div className="h-4 w-px bg-blue-200"></div>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2" onClick={handleBulkDelete}>
                            <Trash2 size={14} className="mr-1.5" />
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-[#3A7AFE]" />
                        <p className="text-slate-500 text-sm">Loading tools...</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 w-12">
                                            <button onClick={toggleSelectAll} className="flex items-center justify-center p-1 rounded hover:bg-slate-200 transition-colors">
                                                {selectedTools.length === filteredTools.length && filteredTools.length > 0 ? (
                                                    <CheckSquare size={18} className="text-[#3A7AFE]" />
                                                ) : (
                                                    <Square size={18} className="text-slate-400" />
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={() => handleSort('name')}>
                                            <div className="flex items-center gap-2">
                                                Tool Name
                                                <ArrowUpDown size={14} className="opacity-50" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={() => handleSort('category')}>
                                            <div className="flex items-center gap-2">
                                                Category
                                                <ArrowUpDown size={14} className="opacity-50" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={() => handleSort('uses')}>
                                            <div className="flex items-center gap-2">
                                                Usage
                                                <ArrowUpDown size={14} className="opacity-50" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredTools.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Wrench className="w-8 h-8 text-slate-300 mb-2" />
                                                    <p className="font-medium text-slate-900">No tools found</p>
                                                    <p className="text-sm">Try adjusting your search or filters.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTools.map((tool) => (
                                            <tr key={tool.id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <button onClick={() => toggleSelectTool(tool.id)} className="flex items-center justify-center p-1 rounded hover:bg-slate-200 transition-colors">
                                                        {selectedTools.includes(tool.id) ? (
                                                            <CheckSquare size={18} className="text-[#3A7AFE]" />
                                                        ) : (
                                                            <Square size={18} className="text-slate-300 group-hover:text-slate-400" />
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-xl shrink-0 shadow-sm">
                                                            {tool.icon}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-900 group-hover:text-[#3A7AFE] transition-colors">{tool.name}</p>
                                                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{tool.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200">
                                                        {tool.category}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-700">{tool.uses.toLocaleString()}</span>
                                                        <span className="text-xs text-slate-400">total uses</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {tool.featured ? (
                                                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 gap-1.5 pl-1.5 pr-2.5 py-0.5 shadow-sm">
                                                            <Star size={12} fill="currentColor" className="text-amber-500" /> Featured
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-slate-500 border-slate-200 bg-white">
                                                            Standard
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-lg" onClick={() => handleEditClick(tool)}>
                                                            <Edit size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDelete(tool.id)}>
                                                            <Trash2 size={16} />
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                                                    <MoreHorizontal size={16} />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-40">
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Download className="mr-2 h-4 w-4" /> Export Data
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination (Static for now) */}
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/30">
                            <p>Showing <span className="font-medium text-slate-900">{filteredTools.length}</span> of <span className="font-medium text-slate-900">{tools.length}</span> tools</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled className="h-8 text-xs">Previous</Button>
                                <Button variant="outline" size="sm" disabled className="h-8 text-xs">Next</Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[550px] rounded-2xl p-0 overflow-hidden gap-0">
                    <DialogHeader className="px-6 py-6 bg-slate-50 border-b border-slate-100">
                        <DialogTitle className="text-xl font-bold text-slate-900">Edit Tool</DialogTitle>
                        <DialogDescription className="text-slate-500 mt-1">
                            Make changes to the tool details here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    {editingTool && (
                        <form onSubmit={handleSaveEdit}>
                            <div className="p-6 space-y-5">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right font-medium text-slate-700">Name</Label>
                                    <Input
                                        id="name"
                                        value={editingTool.name}
                                        onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right font-medium text-slate-700">Category</Label>
                                    <Input
                                        id="category"
                                        value={editingTool.category}
                                        onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="desc" className="text-right font-medium text-slate-700 mt-2">Description</Label>
                                    <textarea
                                        id="desc"
                                        value={editingTool.description}
                                        onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                                        className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="featured" className="text-right font-medium text-slate-700">Featured</Label>
                                    <div className="col-span-3 flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                                        <Switch
                                            id="featured"
                                            checked={editingTool.featured}
                                            onCheckedChange={(checked) => setEditingTool({ ...editingTool, featured: checked })}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-900">Featured Tool</span>
                                            <span className="text-xs text-slate-500">
                                                {editingTool.featured ? 'This tool will appear on the homepage' : 'Standard listing only'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-[#3A7AFE] hover:bg-[#1D4ED8]">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Add Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[550px] rounded-2xl p-0 overflow-hidden gap-0">
                    <DialogHeader className="px-6 py-6 bg-slate-50 border-b border-slate-100">
                        <DialogTitle className="text-xl font-bold text-slate-900">Add New Tool</DialogTitle>
                        <DialogDescription className="text-slate-500 mt-1">
                            Add a new tool to the system.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddTool}>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="new-name" className="text-right font-medium text-slate-700">Name</Label>
                                <Input
                                    id="new-name"
                                    value={newTool.name}
                                    onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="new-category" className="text-right font-medium text-slate-700">Category</Label>
                                <Input
                                    id="new-category"
                                    value={newTool.category}
                                    onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="new-desc" className="text-right font-medium text-slate-700 mt-2">Description</Label>
                                <textarea
                                    id="new-desc"
                                    value={newTool.description}
                                    onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                                    className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="new-icon" className="text-right font-medium text-slate-700">Icon</Label>
                                <div className="col-span-3 flex gap-2">
                                    <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-xl border border-slate-200">
                                        {newTool.icon || '🔧'}
                                    </div>
                                    <Input
                                        id="new-icon"
                                        value={newTool.icon}
                                        onChange={(e) => setNewTool({ ...newTool, icon: e.target.value })}
                                        className="flex-1"
                                        placeholder="Emoji or Icon"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="new-path" className="text-right font-medium text-slate-700">Path</Label>
                                <Input
                                    id="new-path"
                                    value={newTool.path}
                                    onChange={(e) => setNewTool({ ...newTool, path: e.target.value })}
                                    className="col-span-3"
                                    placeholder="/tools/new-tool"
                                />
                            </div>
                        </div>

                        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-[#3A7AFE] hover:bg-[#1D4ED8]">Add Tool</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ToolsManagement;
