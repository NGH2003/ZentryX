import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, User, Eye, Edit2, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface BlogTabProps {
    blogPosts: any[];
    setEditingBlog: (post: any) => void;
}

export function BlogTab({ blogPosts, setEditingBlog }: BlogTabProps) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" ||
            (filter === "published" && post.published) ||
            (filter === "draft" && !post.published);
        return matchesSearch && matchesFilter;
    });

    const publishedCount = blogPosts.filter(p => p.published).length;
    const draftCount = blogPosts.length - publishedCount;

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-purple-600 mb-1">Total Posts</div>
                        <div className="text-3xl font-bold text-gray-900">{blogPosts.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-green-600 mb-1">Published</div>
                        <div className="text-3xl font-bold text-gray-900">{publishedCount}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-orange-600 mb-1">Drafts</div>
                        <div className="text-3xl font-bold text-gray-900">{draftCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Blog Management</CardTitle>
                            <CardDescription>Create and manage your blog content</CardDescription>
                        </div>
                        <Button
                            onClick={() => setEditingBlog({})}
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search posts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={filter === "all" ? "default" : "outline"}
                                onClick={() => setFilter("all")}
                                size="sm"
                            >
                                All
                            </Button>
                            <Button
                                variant={filter === "published" ? "default" : "outline"}
                                onClick={() => setFilter("published")}
                                size="sm"
                                className={filter === "published" ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                                Published
                            </Button>
                            <Button
                                variant={filter === "draft" ? "default" : "outline"}
                                onClick={() => setFilter("draft")}
                                size="sm"
                                className={filter === "draft" ? "bg-orange-500 hover:bg-orange-600" : ""}
                            >
                                Drafts
                            </Button>
                        </div>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative flex flex-col h-full bg-white border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge
                                            className={`${post.published ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white border-0 shadow-sm`}
                                        >
                                            {post.published ? "Published" : "Draft"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-5">
                                    <div className="flex gap-2 mb-3">
                                        {post.tags.slice(0, 2).map((tag: string, i: number) => (
                                            <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {post.tags.length > 2 && (
                                            <Badge variant="secondary" className="text-xs font-normal">
                                                +{post.tags.length - 2}
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t mt-auto">
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date().toLocaleDateString()}
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 hover:bg-purple-50 hover:text-purple-600"
                                            onClick={() => setEditingBlog(post)}
                                        >
                                            <Edit2 className="w-3 h-3 mr-1.5" />
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* New Post Card (if empty or just as an option) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: filteredPosts.length * 0.05 }}
                            onClick={() => setEditingBlog({})}
                            className="flex flex-col h-full min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl items-center justify-center p-6 cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-purple-100 flex items-center justify-center mb-4 transition-colors">
                                <Plus className="w-8 h-8 text-gray-400 group-hover:text-purple-600 transition-colors" />
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">Create New Post</h3>
                            <p className="text-sm text-muted-foreground text-center mt-1 max-w-[200px]">
                                Write a new article for your blog
                            </p>
                        </motion.div>
                    </div>

                    {/* Empty State */}
                    {filteredPosts.length === 0 && search && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearch("");
                                    setFilter("all");
                                }}
                                className="mt-2"
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
