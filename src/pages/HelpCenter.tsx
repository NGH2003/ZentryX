import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Search,
  MessageSquare,
  Bug,
  Lightbulb,
  ChevronRight,
  Settings,
  Shield,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Footer from "@/components/Footer";
import { useBranding } from "@/contexts/BrandingContext";

const HelpCenter = () => {
  const { branding } = useBranding();
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      title: "Getting Started",
      description: "New to our tools? Start here.",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-600",
      articles: ["How to create an account", "Navigating the dashboard", "Understanding tool limits"]
    },
    {
      title: "Account & Billing",
      description: "Manage your subscription and profile.",
      icon: Settings,
      color: "bg-blue-100 text-blue-600",
      articles: ["Changing your password", "Updating billing info", "Canceling subscription"]
    },
    {
      title: "Security & Privacy",
      description: "How we protect your data.",
      icon: Shield,
      color: "bg-green-100 text-green-600",
      articles: ["Two-factor authentication", "Data retention policy", "Privacy settings"]
    }
  ];

  const faqs = [
    {
      question: "Is this service free?",
      answer: "Yes, we offer a free tier with access to most tools. Premium features are available for subscribers."
    },
    {
      question: "How do I report a bug?",
      answer: "You can use the 'Report Bug' button in the Quick Actions section or navigate to the Bug Report page."
    },
    {
      question: "Can I suggest a new tool?",
      answer: "Absolutely! We love hearing from our users. Use the 'Feature Request' page to submit your ideas."
    },
    {
      question: "Is my data secure?",
      answer: "We use industry-standard encryption and security practices to ensure your data is safe."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-900">
      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 opacity-60"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-6 py-2 text-sm shadow-lg" role="status">
              <HelpCircle className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Support</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Help </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Center
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers, learn how to use our tools, and get support.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for help articles, FAQs, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg rounded-xl border-0 shadow-xl bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <Link to="/contact">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 bg-white/80 backdrop-blur-sm group">
              <CardContent className="flex items-center space-x-4 pt-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">Contact Us</h3>
                  <p className="text-sm text-gray-500">Get direct support</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/bug-report">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-200 bg-white/80 backdrop-blur-sm group">
              <CardContent className="flex items-center space-x-4 pt-6">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bug className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">Report Bug</h3>
                  <p className="text-sm text-gray-500">Found an issue?</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/feature-request">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-yellow-200 bg-white/80 backdrop-blur-sm group">
              <CardContent className="flex items-center space-x-4 pt-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors">Feature Request</h3>
                  <p className="text-sm text-gray-500">Suggest improvements</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Help Categories */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <div className="space-y-6">
              {helpCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      {category.title}
                    </CardTitle>
                    <p className="text-gray-500 mt-2">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <button className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 w-full p-2 rounded-lg transition-colors text-left text-sm font-medium group">
                            <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-600" />
                            {article}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Collapsible key={index}>
                  <Card className="border hover:border-blue-200 transition-colors">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50/50 p-4">
                        <CardTitle className="text-base text-left font-semibold text-gray-800 flex justify-between items-center">
                          {faq.question}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4 px-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;