import { useState } from "react";
import { Wrench, Image, Calculator, RefreshCw, Shield, Code, Palette, Zap, Star, TrendingUp, Sparkles, ArrowRight, Check, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        gradient: "from-green-500 to-emerald-500",
        description: "Quick calculations"
    },
    {
        name: "Converter Tools",
        icon: RefreshCw,
        count: 9,
        gradient: "from-orange-500 to-red-500",
        description: "Convert between formats"
    },
    {
        name: "Security Tools",
        icon: Shield,
        count: 6,
        gradient: "from-indigo-500 to-blue-500",
        description: "Passwords and encryption"
    },
    {
        name: "Developer Tools",
        icon: Wrench,
        count: 7,
        gradient: "from-yellow-500 to-orange-500",
        description: "Code utilities"
    },
    {
        name: "Design Tools",
        icon: Palette,
        count: 5,
        gradient: "from-pink-500 to-rose-500",
        description: "Colors and design"
    },
    {
        name: "Utility Tools",
        icon: Zap,
        count: 6,
        gradient: "from-teal-500 to-cyan-500",
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
    const [searchTerm, setSearchTerm] = useState("");
    const { branding } = useBranding();
    const { config: adsConfig } = useAds();
    const navigate = useNavigate();

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (value.trim()) {
            navigate(`/tools?search=${encodeURIComponent(value.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            {/* Header Ad */}
            {adsConfig.enabled && adsConfig.slots.header.enabled && (
                <div className="max-w-7xl mx-auto px-4 mt-20">
                    <AdUnit slot="header" />
                </div>
            )}

            {/* ========== HERO SECTION ========== */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
                    <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-pink-400/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-default">
                            <Sparkles className="w-4 h-4 text-[#3A7AFE] mr-2" />
                            <span className="text-sm font-semibold text-slate-700">New Tools Added Weekly</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight text-slate-900">
                            Smart Tools. <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#F59E0B] bg-clip-text text-transparent">
                                Zero Effort.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Access 40+ free developer and productivity tools. No signup required. Fast, secure, and always free.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-12 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#F59E0B] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2">
                                <Search className="w-6 h-6 text-slate-400 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search tools (e.g., Password Generator, PDF to JPG)..."
                                    className="w-full p-4 text-lg bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                                />
                                <Button
                                    onClick={() => handleSearch(searchTerm)}
                                    className="hidden sm:flex bg-[#3A7AFE] hover:bg-[#1D4ED8] text-white px-8 py-6 rounded-xl font-bold text-lg transition-all"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/tools">
                                <Button className="btn-primary w-full sm:w-auto px-8 py-6 text-lg">
                                    Browse All Tools
                                </Button>
                            </Link>
                            <Link to="/tools?filter=trending">
                                <Button variant="outline" className="btn-secondary w-full sm:w-auto px-8 py-6 text-lg bg-white">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    Top Tools
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== TOOL CATEGORIES GRID ========== */}
            <section className="py-20 px-4 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Browse by Category
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl">
                                Find the perfect tool for your needs across our organized categories
                            </p>
                        </div>
                        <Link to="/tools" className="text-[#3A7AFE] font-semibold hover:text-[#1D4ED8] flex items-center group">
                            View all categories <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {toolCategories.map((category, index) => (
                            <Link to={`/tools?category=${category.name.toLowerCase()}`} key={category.name}>
                                <div
                                    className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#3A7AFE] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                        <category.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#3A7AFE] transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{category.description}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            {category.count} tools
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight className="w-4 h-4 text-[#3A7AFE]" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FEATURED TOOLS ========== */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-bold text-sm">
                            <Star className="w-4 h-4 mr-2 fill-current" />
                            Most Popular
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Featured Tools
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our most-used tools, trusted by thousands of professionals worldwide for their speed and accuracy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuredTools.map((tool, index) => (
                            <Link to="/tools" key={tool.name}>
                                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#3A7AFE]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group">
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 filter drop-shadow-sm">
                                            {tool.icon}
                                        </div>
                                        {tool.badge && (
                                            <span className={`
                                                px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                ${tool.badge === 'new' ? 'bg-green-100 text-green-700 border border-green-200' : ''}
                                                ${tool.badge === 'trending' ? 'bg-orange-100 text-orange-700 border border-orange-200' : ''}
                                                ${tool.badge === 'updated' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                                            `}>
                                                {tool.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3A7AFE] transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-5">{tool.category}</p>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-[#3A7AFE] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Try Tool
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/tools">
                            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 hover:bg-slate-50">
                                View All 40+ Tools
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== WHY USE ZENTRYX ========== */}
            <section className="py-24 px-4 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Fast */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Zap className="w-10 h-10 text-[#3A7AFE]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Lightning Fast</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Instant load times with no bloat. Our tools are optimized for performance so you can get work done faster.
                            </p>
                        </div>

                        {/* Accurate */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Check className="w-10 h-10 text-[#9333EA]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Precision Accuracy</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Developer-grade utilities you can trust. Every calculation and conversion is verified for 100% accuracy.
                            </p>
                        </div>

                        {/* Free Forever */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Star className="w-10 h-10 text-[#F59E0B] fill-[#F59E0B]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">100% Free</h3>
                            <p className="text-slate-600 leading-relaxed">
                                No credit cards, no signups, no hidden fees. Just open access to all premium tools, forever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CTA SECTION ========== */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0F172A] -z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A7AFE]/20 to-[#9333EA]/20 -z-10"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">
                        Ready to boost your productivity?
                    </h2>
                    <p className="text-xl mb-12 text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        Join thousands of developers, designers, and creators who use Zentryx tools daily to simplify their workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/tools">
                            <Button size="lg" className="bg-[#3A7AFE] hover:bg-[#1D4ED8] text-white px-10 py-7 rounded-xl text-lg font-bold shadow-lg hover:shadow-blue-500/25 transition-all">
                                Get Started Now
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button size="lg" variant="outline" className="bg-transparent border-2 border-slate-600 text-white hover:bg-white/10 hover:border-white px-10 py-7 rounded-xl text-lg font-bold transition-all">
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
