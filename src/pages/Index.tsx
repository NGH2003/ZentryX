import { useState } from "react";
import { Search, Calculator, Type, TrendingUp, Settings, ArrowRight, Star, Users, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useBranding } from "@/contexts/BrandingContext";
import { useAds } from "@/contexts/AdsContext";
import { AdUnit } from "@/components/AdUnit";

const featuredTools = [
  {
    id: 1,
    name: "Password Generator",
    description: "Generate secure passwords with custom settings",
    icon: "🔐",
    category: "Security",
    rating: 4.8,
    uses: 12500
  },
  {
    id: 2,
    name: "Color Picker",
    description: "Pick and convert colors between different formats",
    icon: "🎨",
    category: "Design",
    rating: 4.9,
    uses: 8900
  },
  {
    id: 3,
    name: "QR Code Generator",
    description: "Create QR codes for URLs, text, and more",
    icon: "📱",
    category: "Generators",
    rating: 4.7,
    uses: 15200
  },
  {
    id: 4,
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: "🔤",
    category: "Converters",
    rating: 4.6,
    uses: 6800
  }
];

const categories = [
  { name: "Converters", icon: Calculator, count: 24, color: "bg-blue-500" },
  { name: "Calculators", icon: Calculator, count: 18, color: "bg-green-500" },
  { name: "Text Tools", icon: Type, count: 32, color: "bg-purple-500" },
  { name: "SEO Tools", icon: TrendingUp, count: 15, color: "bg-orange-500" },
  { name: "Generators", icon: Settings, count: 21, color: "bg-pink-500" },
  { name: "Design Tools", icon: Zap, count: 12, color: "bg-indigo-500" }
];

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      {/* Header Ad */}
      {adsConfig.enabled && adsConfig.slots.header.enabled && (
        <div className="max-w-7xl mx-auto px-4 mt-20">
          <AdUnit slot="header" />
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 opacity-60"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-6 py-2 text-sm shadow-lg hover:shadow-xl transition-shadow" role="status">
              <Zap className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">New Tools Added Weekly</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Your All-in-One </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {branding.siteName || "Digital Toolkit"}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              {branding.tagline || "43 professional tools for developers and designers."}
              <span className="block mt-2 text-base text-gray-600">No signup. No payment. No limits. Just results.</span>
            </p>

            <div className="max-w-3xl mx-auto mb-10 animate-scale-in">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" aria-hidden="true"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-1.5">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" aria-hidden="true" />
                  <Input
                    type="search"
                    placeholder="Search 43 tools - try 'password', 'color', 'calculator'..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-14 pr-6 py-6 text-lg rounded-xl border-0 focus:ring-4 focus:ring-blue-300 bg-white relative"
                    aria-label="Search for tools"
                    role="searchbox"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/tools">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-6 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-blue-300 w-full sm:w-auto"
                  aria-label="Browse all 43 tools"
                >
                  <span>Explore All Tools</span>
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats & Features Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" aria-label="Platform statistics and features">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Stats - 3 columns */}
            <article className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-2 border-blue-200 hover:border-blue-400 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform" aria-label="43 digital tools">
                43
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-1">Digital Tools</h3>
              <p className="text-sm text-gray-700">Ready to use instantly</p>
            </article>

            <article className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 border-2 border-purple-200 hover:border-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform" aria-label="50 thousand plus happy users">
                50K+
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-1">Happy Users</h3>
              <p className="text-sm text-gray-700">Worldwide community</p>
            </article>

            <article className="group text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 border-2 border-pink-200 hover:border-pink-400 transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-pink-600 to-pink-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform" aria-label="1 million plus tools used">
                1M+
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-1">Tools Used</h3>
              <p className="text-sm text-gray-700">Every month</p>
            </article>

            {/* Feature Tiles - 2 columns */}
            <article className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 border-2 border-green-300 hover:border-green-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:scale-105 transition-transform">
                  No Sign-Up
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-3">
                  Start using instantly. No registration required!
                </p>
                <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-xs">100% Anonymous</span>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 border-2 border-blue-300 hover:border-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mt-12"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:scale-105 transition-transform">
                  Unlimited Use
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-3">
                  No limits, no restrictions. Use as much as you want!
                </p>
                <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1z" />
                  </svg>
                  <span className="text-white font-bold text-xs">Forever Free</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="featured-tools-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-6 py-2 text-sm shadow-lg" role="status">
              <Star className="w-4 h-4 inline mr-2 fill-white" />
              Most Popular
            </Badge>
            <h2 id="featured-tools-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Tools
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Trusted by thousands of professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <article
                key={tool.id}
                className="group hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-blue-400 bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 hover:-translate-y-2 rounded-xl overflow-hidden transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="pb-3 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" role="img" aria-label={`${tool.name} icon`}>
                      {tool.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs px-3 py-1">
                      {tool.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 bg-gray-50 group-hover:bg-blue-50 rounded-lg p-3 transition-colors" aria-label={`Rating ${tool.rating} out of 5, used by ${tool.uses.toLocaleString()} people`}>
                    <div className="flex items-center space-x-1.5">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      <span className="font-bold text-base text-gray-900">{tool.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      <span className="text-sm font-semibold text-gray-900">{tool.uses.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/tools">
                    <Button
                      size="lg"
                      className="w-full text-sm py-4 font-bold rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 hover:scale-105 focus:ring-4 focus:ring-blue-300 transition-all shadow-md hover:shadow-lg"
                      aria-label={`Try ${tool.name} now`}
                    >
                      Try Now Free
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect tool for your needs across our organized categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-0.5">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.count} tools</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to boost your productivity?</h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed">
            Join thousands of developers and creators who use our tools daily
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/tools">
              <Button size="lg" variant="secondary" className="px-12 py-7 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-12 py-7 rounded-xl text-lg font-bold bg-white/10 text-white border-2 border-white hover:bg-white hover:text-purple-600 transition-all duration-300 w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      {adsConfig.enabled && adsConfig.slots.footer.enabled && (
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <AdUnit slot="footer" />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
