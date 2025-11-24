import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, Rocket, ThumbsUp, Star, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";

const FeatureRequest = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    useCase: "",
    priority: "",
    email: ""
  });
  const { toast } = useToast();
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feature Request Submitted!",
      description: "Thanks for your idea! We'll review it shortly.",
    });

    setFormData({
      title: "",
      category: "",
      description: "",
      useCase: "",
      priority: "",
      email: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

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
            <Badge className="mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-6 py-2 text-sm shadow-lg" role="status">
              <Lightbulb className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Share Ideas</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Request a </span>
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Feature
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Help us shape the future of {siteName}. Your ideas matter.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-transparent hover:border-yellow-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-white/50">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-yellow-600" />
                  </div>
                  Feature Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-medium">Feature Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Dark Mode Toggle, PDF Compressor"
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base font-medium">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-tool">New Tool Idea</SelectItem>
                          <SelectItem value="enhancement">Existing Tool Enhancement</SelectItem>
                          <SelectItem value="ui-ux">UI/UX Improvement</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-base font-medium">Priority Level</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="How important is this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Nice to have</SelectItem>
                          <SelectItem value="medium">Would be helpful</SelectItem>
                          <SelectItem value="high">Critical for my workflow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-medium">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the feature in detail..."
                      className="min-h-24 bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="useCase" className="text-base font-medium">Use Case / Problem Solved</Label>
                    <Textarea
                      id="useCase"
                      value={formData.useCase}
                      onChange={(e) => handleInputChange("useCase", e.target.value)}
                      placeholder="Why do you need this? What problem does it solve?"
                      className="min-h-24 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="To notify you when it's built"
                      className="bg-white"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all font-bold text-white">
                    <Star className="mr-2 h-5 w-5" />
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-2 border-transparent hover:border-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ThumbsUp className="h-5 w-5 text-blue-600" />
                  What Makes a Good Request?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Be Specific</h4>
                    <p className="text-gray-600 text-sm">Explain exactly what you want the feature to do.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Explain the "Why"</h4>
                    <p className="text-gray-600 text-sm">Help us understand the problem you're trying to solve.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Examples</h4>
                    <p className="text-gray-600 text-sm">If you've seen it elsewhere, tell us where!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-transparent hover:border-purple-200 transition-all duration-300 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Recently Added
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Dark Mode Support</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>JSON Formatter</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Image Compressor</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeatureRequest;