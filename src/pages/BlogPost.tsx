import { useParams, Link, Navigate } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const { getPostBySlug } = useBlog();

    if (!slug) {
        return <Navigate to="/blog" />;
    }

    const post = getPostBySlug(slug);

    if (!post || !post.published) {
        return <Navigate to="/blog" />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navigation />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link to="/blog">
                        <Button variant="ghost" className="mb-8 hover:bg-white/50">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>

                    {/* Cover Image */}
                    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                            }}
                        />
                    </div>

                    {/* Article Header */}
                    <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b">
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-4 h-4" />
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            <Tag className="w-4 h-4 text-gray-500 mt-1" />
                            {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <div className="text-xl text-gray-700 font-medium mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                                {post.excerpt}
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-12 pt-8 border-t">
                            <Link to="/blog">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Read More Articles
                                </Button>
                            </Link>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
