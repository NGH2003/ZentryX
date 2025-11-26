import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Tag } from "lucide-react";

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

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header />

            {/* Hero Section */}
            <header className="relative pt-20 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 opacity-60"></div>
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="animate-fade-in">
                        <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-6 py-2 text-sm shadow-lg" role="status">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            <span>Latest Updates</span>
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            <span className="text-gray-900">Our </span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Blog & Insights
                            </span>
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                            Discover tutorials, tech news, and updates about our latest tools and features.
                        </p>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 pb-20">

                {/* Search and Filter */}
                <div className="max-w-3xl mx-auto mb-16 space-y-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" aria-hidden="true"></div>
                        <div className="relative bg-white rounded-2xl shadow-xl p-1.5">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" aria-hidden="true" />
                            <Input
                                type="text"
                                placeholder="Search articles, tutorials, and guides..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-14 pr-6 py-6 text-lg rounded-xl border-0 focus:ring-4 focus:ring-blue-300 bg-white relative w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Tags Filter */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Badge
                            variant={selectedTag === null ? "default" : "outline"}
                            className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${selectedTag === null ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg scale-105' : 'bg-white hover:bg-gray-50 hover:border-blue-300'}`}
                            onClick={() => setSelectedTag(null)}
                        >
                            All Posts
                        </Badge>
                        {allTags.map(tag => (
                            <Badge
                                key={tag}
                                variant={selectedTag === tag ? "default" : "outline"}
                                className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${selectedTag === tag ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg scale-105' : 'bg-white hover:bg-gray-50 hover:border-blue-300'}`}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                        {filteredPosts.map((post) => (
                            <Link key={post.id} to={`/blog/${post.slug}`}>
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                                    <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                                            }}
                                        />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="line-clamp-2 text-lg hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col justify-between">
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {post.tags.slice(0, 3).map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
