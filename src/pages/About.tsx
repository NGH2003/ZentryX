import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Zap, Shield, Code, Globe } from "lucide-react";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";

const About = () => {
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

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
              <Users className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">About Us</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">We Build Tools for </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creators
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive toolkit for digital productivity. Simple, fast, and accessible to everyone.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {siteName} was created to provide developers, designers, and digital professionals with
                  essential tools in one convenient platform. We believe productivity should be simple,
                  fast, and accessible to everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  What We Offer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Code className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span>Development helpers and converters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>Text processing and formatting tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Security and encoding tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Productivity calculators</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg border-2 border-transparent hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="group">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                    <Shield className="w-5 h-5" />
                    Privacy First
                  </h4>
                  <p className="text-gray-600 pl-7">All tools run locally in your browser. Your data never leaves your device, ensuring complete confidentiality.</p>
                </div>
                <div className="group">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-purple-600 transition-colors">
                    <Code className="w-5 h-5" />
                    Open Source
                  </h4>
                  <p className="text-gray-600 pl-7">Built with transparency and community contribution in mind. We believe in the power of shared knowledge.</p>
                </div>
                <div className="group">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                    <Users className="w-5 h-5" />
                    User Focused
                  </h4>
                  <p className="text-gray-600 pl-7">Every feature is designed with user experience and efficiency as top priorities. No clutter, just tools.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;