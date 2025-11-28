import React, { useState } from 'react';
import {
    FileText,
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Search,
    Filter,
    MoreHorizontal,
    Image as ImageIcon,
    Calendar,
    User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/contexts/BlogContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContentManagement = () => {
    const { blogPosts: posts, deletePost } = useBlog();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = Array.from(new Set(posts.flatMap(post => post.tags)));

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.tags.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Content Management</h1>
                    <p className="text-slate-500 mt-1">Create, edit, and manage your blog posts.</p>
                </div>
                <Button className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 gap-2">
                    <Plus size={16} /> New Blog Post
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative flex-1 w-full max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A7AFE] transition-colors" size={18} />
                    <Input
                        placeholder="Search posts..."
                        className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-white border-slate-200">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-4">
                {filteredPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No posts found</h3>
                        <p className="text-slate-500 mt-1 max-w-xs mx-auto">Get started by creating your first blog post.</p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <div key={post.id} className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-6 items-start">
                            {/* Image */}
                            <div className="w-full sm:w-48 aspect-video sm:aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100 relative">
                                {post.coverImage ? (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                ) : null}
                                <div className={`absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300 ${post.coverImage ? 'hidden' : ''}`}>
                                    <ImageIcon size={32} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-3 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100">
                                        {post.tags[0] || 'Uncategorized'}
                                    </Badge>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar size={12} /> {post.date}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3A7AFE] transition-colors line-clamp-1">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 line-clamp-2 text-sm mt-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-1">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                        <User size={12} />
                                        <span className="font-medium text-slate-700">{post.author}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col items-center justify-end gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 mt-2 sm:mt-0">
                                <Button variant="outline" size="sm" className="flex-1 sm:w-full gap-2 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm">
                                    <Edit size={14} /> Edit
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="flex-1 sm:w-full text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <ExternalLink className="mr-2 h-4 w-4" /> View Live
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => deletePost(post.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
