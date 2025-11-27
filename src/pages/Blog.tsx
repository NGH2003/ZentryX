import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Tag, Star, ArrowRight } from "lucide-react";

const Blog = () => {
    const { blogPosts } = useBlog();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Filter only published posts
    const publishedPosts = blogPosts.filter(post => post.published);

    // Get all unique tags
    const allTags = Array.from(new Set(publishedPosts.flatMap(post => post.tags)));

    // Filter posts based on search and tag
    const filteredPosts = publishedPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    // Get popular posts (random for now, or based on some metric if available)
    const popularPosts = publishedPosts.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header />

            {/* Hero Section */}
            <header className="relative pt-20 pb-12 px-4 overflow-hidden bg-white/50 backdrop-blur-sm border-b border-white/20">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-100/50 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto text-center">
                    <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 px-4 py-1.5 text-sm font-medium transition-colors">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Latest Updates & Insights
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#F59E0B] bg-clip-text text-transparent tracking-tight">
                        Our Blog
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover tutorials, tech news, and updates about our latest tools and features.
                    </p>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                                <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                                    className="mt-4 text-blue-600 hover:underline font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {filteredPosts.map((post) => (
                                    <Link key={post.id} to={`/blog/${post.slug}`} className="h-full">
                                        <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group">
                                            <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                                                <div className="absolute top-3 left-3 z-10">
                                                    <Badge className="bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm shadow-sm">
                                                        {post.tags[0]}
                                                    </Badge>
                                                </div>
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                                                    }}
                                                />
                                            </div>
                                            <CardContent className="flex-1 p-5 flex flex-col">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {post.author}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Search Widget */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Search className="w-5 h-5 text-blue-500" />
                                    Search
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories/Tags Widget */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-purple-500" />
                                    Topics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant={selectedTag === null ? "default" : "outline"}
                                        className={`cursor-pointer px-3 py-1.5 text-sm transition-all ${selectedTag === null ? 'bg-gray-900 hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                                        onClick={() => setSelectedTag(null)}
                                    >
                                        All
                                    </Badge>
                                    {allTags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant={selectedTag === tag ? "default" : "outline"}
                                            className={`cursor-pointer px-3 py-1.5 text-sm transition-all ${selectedTag === tag ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-100'}`}
                                            onClick={() => setSelectedTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Popular Posts Widget */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    Popular Posts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                {popularPosts.map(post => (
                                    <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                                        <div className="w-20 h-16 rounded-md overflow-hidden shrink-0 bg-gray-100">
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(post.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Newsletter/Ad Widget Placeholder */}
                        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white text-center shadow-lg">
                            <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                            <p className="text-blue-100 text-sm mb-4">Get the latest tools and updates delivered to your inbox.</p>
                            <Input
                                placeholder="Enter your email"
                                className="bg-white/20 border-white/30 text-white placeholder:text-blue-100 mb-3 focus:bg-white/30"
                            />
                            <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition-colors text-sm">
                                Subscribe
                            </button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
