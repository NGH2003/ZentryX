import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";

const Privacy = () => {
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

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
              <Shield className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Legal</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Privacy </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              We value your trust. Here is how we protect and handle your information.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-8">
          <Card className="shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                {siteName} is designed with privacy in mind. Most of our tools run entirely in your browser,
                meaning your data never leaves your device.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0"></div>
                  <span><strong>Usage Analytics:</strong> We collect anonymous usage statistics to improve our services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0"></div>
                  <span><strong>Account Information:</strong> If you create an account, we store your email and preferences.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0"></div>
                  <span><strong>Tool Data:</strong> Most tool operations happen locally and are not transmitted to our servers.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>To provide and maintain our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>To improve user experience and tool functionality</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>To send important service updates (if you have an account)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>To analyze usage patterns and optimize performance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                  <span>Encryption in transit and at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                  <span>Minimal data collection principles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                  <span>Secure authentication systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-transparent hover:border-orange-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Database className="h-6 w-6 text-orange-600" />
                </div>
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">You have the right to:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Access your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Correct inaccurate data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Delete your account and associated data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Export your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Opt out of non-essential communications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center text-gray-600 mt-12">
            <p>Last updated: December 2024</p>
            <p className="mt-2">
              Questions about this policy? <a href="/contact" className="text-blue-600 hover:underline font-medium">Contact us</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;