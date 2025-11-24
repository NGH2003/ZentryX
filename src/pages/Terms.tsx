import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, AlertTriangle, Scale, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";

const Terms = () => {
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
              <Scale className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Legal</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Terms of </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services.
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
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                By accessing and using {siteName}, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                Permission is granted to temporarily use {siteName} for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-gray-600 font-medium">This license shall automatically terminate if you violate any of these restrictions:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>Do not modify or copy the materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>Do not use the materials for commercial purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>Do not attempt to reverse engineer any software</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2.5 flex-shrink-0"></div>
                  <span>Do not remove any copyright or proprietary notations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-transparent hover:border-orange-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                Service Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Scheduled maintenance may temporarily interrupt service</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>We reserve the right to modify or discontinue services with notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2.5 flex-shrink-0"></div>
                  <span>Some tools may have usage limitations or rate limits</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-green-600" />
                </div>
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                The materials on {siteName} are provided on an 'as is' basis. {siteName} makes no warranties,
                expressed or implied, and hereby disclaim and negates all other warranties including without
                limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </CardContent>
          </Card>

          <div className="text-center text-gray-600 mt-12">
            <p>Last updated: December 2024</p>
            <p className="mt-2">
              Questions about these terms? <a href="/contact" className="text-blue-600 hover:underline font-medium">Contact us</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;