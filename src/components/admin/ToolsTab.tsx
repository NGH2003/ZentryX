import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings, Search, Filter, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ToolsTabProps {
    tools: any[];
    enabledTools: Record<number, boolean>;
    toggleTool: (id: number) => void;
    setEditingTool: (tool: any) => void;
}

export function ToolsTab({ tools, enabledTools, toggleTool, setEditingTool }: ToolsTabProps) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Get unique categories
    const categories = ["all", ...Array.from(new Set(tools.map(t => t.category)))];

    // Filter tools
    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
            tool.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || tool.category === category;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTools = filteredTools.slice(startIndex, startIndex + itemsPerPage);

    // Stats
    const enabledCount = Object.values(enabledTools).filter(Boolean).length;
    const disabledCount = tools.length - enabledCount;

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-blue-600 mb-1">Total Tools</div>
                        <div className="text-3xl font-bold text-gray-900">{tools.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-green-600 mb-1">Active</div>
                        <div className="text-3xl font-bold text-gray-900">{enabledCount}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-red-600 mb-1">Disabled</div>
                        <div className="text-3xl font-bold text-gray-900">{disabledCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Tools Management</CardTitle>
                            <CardDescription>Manage visibility and settings for all tools</CardDescription>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Tool
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search tools..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-10"
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === "all" ? "All Categories" : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {paginatedTools.map((tool, index) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-start justify-between p-4 border rounded-xl transition-all hover:shadow-md ${enabledTools[tool.id] ? 'bg-white' : 'bg-gray-50/80'
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl shrink-0">
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                                            {!enabledTools[tool.id] && (
                                                <Badge variant="secondary" className="text-xs h-5">Disabled</Badge>
                                            )}
                                            {tool.featured && (
                                                <Badge className="text-xs h-5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-0">Featured</Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{tool.description}</p>
                                        <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 pl-4">
                                    <Switch
                                        checked={enabledTools[tool.id] ?? true}
                                        onCheckedChange={() => toggleTool(tool.id)}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-gray-500 hover:text-blue-600"
                                        onClick={() => setEditingTool(tool)}
                                    >
                                        <Settings className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredTools.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No tools found</h3>
                            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("all");
                                }}
                                className="mt-2"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between pt-6 mt-6 border-t">
                            <p className="text-sm text-muted-foreground">
                                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTools.length)} of {filteredTools.length} tools
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-8 ${currentPage === pageNum ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
