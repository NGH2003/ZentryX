import { useState } from "react";
import { Wrench, Image, Calculator, RefreshCw, Shield, Code, Palette, Zap, Star, TrendingUp, Sparkles, ArrowRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
import { useBranding } from "@/contexts/BrandingContext";
import { useAds } from "@/contexts/AdsContext";
import { AdUnit } from "@/components/AdUnit";

// Tool Categories with Icons
const toolCategories = [
    {
        name: "Text Tools",
        icon: Code,
        count: 12,
        gradient: "from-blue-500 to-cyan-500",
        description: "Transform and analyze text"
    },
    {
        name: "Image Tools",
        icon: Image,
        count: 8,
        gradient: "from-purple-500 to-pink-500",
        description: "Edit and convert images"
    },
    {
        name: "Calculator Tools",
        icon: Calculator,
        count: 10,
        gradient: "from-indigo-500 to-blue-500",
        description: "Quick calculations"
    },
    {
        name: "Converter Tools",
        icon: RefreshCw,
        count: 9,
        gradient: "from-pink-500 to-rose-500",
        description: "Convert between formats"
    },
    {
        name: "Security Tools",
        icon: Shield,
        count: 6,
        gradient: "from-violet-500 to-purple-500",
        description: "Passwords and encryption"
    },
    {
        name: "Developer Tools",
        icon: Wrench,
        count: 7,
        gradient: "from-cyan-500 to-blue-500",
        description: "Code utilities"
    },
    {
        name: "Design Tools",
        icon: Palette,
        count: 5,
        gradient: "from-fuchsia-500 to-pink-500",
        description: "Colors and design"
    },
    {
        name: "Utility Tools",
        icon: Zap,
        count: 6,
        gradient: "from-teal-500 to-emerald-500",
        description: "Everyday utilities"
    },
];

// Featured Tools (Top 12)
const featuredTools = [
    { name: "Password Generator", icon: "🔐", category: "Security", badge: "trending" },
    { name: "Image Compressor", icon: "🖼️", category: "Image", badge: "new" },
    { name: "QR Code Generator", icon: "📱", category: "Generators", badge: "trending" },
    { name: "Text Case Converter", icon: "🔤", category: "Text", badge: null },
    { name: "Unit Converter", icon: "⚖️", category: "Converters", badge: null },
    { name: "Age Calculator", icon: "🎂", category: "Calculators", badge: null },
    { name: "Color Picker", icon: "🎨", category: "Design", badge: "updated" },
    { name: "JSON Formatter", icon: "📋", category: "Developer", badge: null },
    { name: "Word Counter", icon: "📝", category: "Text", badge: null },
    { name: "Base64 Encoder", icon: "🔢", category: "Developer", badge: null },
    { name: "PNG to JPG", icon: "🔄", category: "Image", badge: null },
    { name: "Loan Calculator", icon: "💰", category: "Calculators", badge: null },
];

const IndexZentryx = () => {
    const { branding } = useBranding();
    const { config: adsConfig } = useAds();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header />

            {/* Header Ad */}
            {adsConfig.enabled && adsConfig.slots.header.enabled && (
                <div className="max-w-7xl mx-auto px-4 mt-20">
                    <AdUnit slot="header" />
                </div>
            )}

            {/* ========== HERO SECTION ========== */}
            <section className="relative pt-24 pb-20 px-4 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative">
                    <div className="animate-fade-in-up">
                        {/* Badge */}
                        <Badge className="mb-6 bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] text-white border-0 px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow">
                            <Sparkles className="w-4 h-4 inline mr-2" />
                            New Tools Added Weekly
                        </Badge>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="text-gray-900">40+ Free Online Tools.</span>
                            <br />
                            <span className="bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#DB2777] bg-clip-text text-transparent">
                                Fast. Simple. Trusted.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed font-medium">
                            Converters, Calculators, Generators & More — All in One Place.
                        </p>
                        <p className="text-base text-gray-600 mb-12 max-w-2xl mx-auto">
                            No signup. No payment. No limits. Just results.
                        </p>



                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/tools">
                                <Button className="btn-primary px-12 py-7 text-lg font-bold rounded-xl shadow-zentryx-lg">
                                    Explore All Tools
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/tools?filter=trending">
                                <Button variant="outline" className="px-12 py-7 text-lg font-bold rounded-xl border-2 border-[#3A7AFE] text-[#3A7AFE] hover:bg-[#3A7AFE] hover:text-white transition-all">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    Top Tools
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== TOOL CATEGORIES GRID ========== */}
            <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find the perfect tool for your needs across our organized categories
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {toolCategories.map((category, index) => (
                            <Link to={`/tools?category=${category.name.toLowerCase()}`} key={category.name}>
                                <Card
                                    className="card-zentryx hover-lift group cursor-pointer overflow-hidden"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="p-6">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <category.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3A7AFE] transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-500">{category.count} tools</span>
                                            <ArrowRight className="w-4 h-4 text-[#3A7AFE] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FEATURED TOOLS (TOP 12) ========== */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-6 py-2 text-sm font-bold shadow-lg">
                            <Star className="w-4 h-4 inline mr-2 fill-white" />
                            Most Popular
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Featured Tools
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our most-used tools, trusted by thousands of professionals worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuredTools.map((tool, index) => (
                            <Link to="/tools" key={tool.name}>
                                <Card
                                    className="card-gradient hover-lift group cursor-pointer h-full"
                                    style={{ animationDelay: `${index * 75}ms` }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                                {tool.icon}
                                            </div>
                                            {tool.badge && (
                                                <Badge className={`badge-${tool.badge} text-xs`}>
                                                    {tool.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#3A7AFE] transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">{tool.category}</p>
                                        <Button
                                            size="sm"
                                            className="w-full bg-gradient-to-r from-[#3A7AFE] to-[#1D4ED8] text-white hover:shadow-lg transition-all"
                                        >
                                            Try Now
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== WHY USE ZENTRYX ========== */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Use ZENTRYX?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need. Zero complexity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Fast */}
                        <Card className="card-zentryx text-center group">
                            <div className="p-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Zap className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Instant load, no ads disturbance. Lightning-fast performance for all your tools.
                                </p>
                            </div>
                        </Card>

                        {/* Accurate */}
                        <Card className="card-zentryx text-center group">
                            <div className="p-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Check className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Accurate</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Developer-grade utilities. Precision and reliability you can trust.
                                </p>
                            </div>
                        </Card>

                        {/* Free Forever */}
                        <Card className="card-zentryx text-center group">
                            <div className="p-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Star className="w-10 h-10 text-white fill-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Free Forever</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    No login, fully open access. All tools completely free, always.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* ========== NEW TOOLS SECTION ========== */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="mb-6 badge-new">
                            <Sparkles className="w-4 h-4 inline mr-2" />
                            Recently Added
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            New Tools
                        </h2>
                        <p className="text-lg text-gray-600">
                            Check out our latest additions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredTools.filter(t => t.badge === "new" || t.badge === "updated").map((tool) => (
                            <Link to="/tools" key={tool.name}>
                                <Card className="card-gradient hover-lift group cursor-pointer">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-4xl">{tool.icon}</div>
                                            <Badge className={`badge-${tool.badge} text-xs`}>
                                                {tool.badge}
                                            </Badge>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                                        <p className="text-sm text-gray-600">{tool.category}</p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA SECTION ========== */}
            <section className="py-20 px-4 bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#DB2777] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Ready to boost your productivity?
                    </h2>
                    <p className="text-xl mb-10 text-white/90 leading-relaxed">
                        Join thousands of developers and creators who use our tools daily
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/tools">
                            <Button size="lg" className="bg-white text-[#3A7AFE] hover:bg-gray-100 px-12 py-7 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-7 rounded-xl text-lg font-bold backdrop-blur-sm">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Ad */}
            {adsConfig.enabled && adsConfig.slots.footer.enabled && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <AdUnit slot="footer" />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default IndexZentryx;
