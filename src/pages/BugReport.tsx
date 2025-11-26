import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bug, AlertTriangle, Info, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";
import { tools } from "@/data/tools";

const BugReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    severity: "",
    toolAffected: "",
    description: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    browserInfo: "",
    contactEmail: ""
  });
  const { toast } = useToast();
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.severity || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new bug report object
    const newReport = {
      id: Date.now(),
      ...formData,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingReports = JSON.parse(localStorage.getItem('bugReports') || '[]');
    localStorage.setItem('bugReports', JSON.stringify([newReport, ...existingReports]));

    toast({
      title: "Bug Report Submitted!",
      description: `Thank you for helping us improve ${siteName}. We'll investigate this issue.`,
    });

    setFormData({
      title: "",
      severity: "",
      toolAffected: "",
      description: "",
      stepsToReproduce: "",
      expectedBehavior: "",
      actualBehavior: "",
      browserInfo: "",
      contactEmail: ""
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
              <Bug className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Report Issue</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Report a </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Bug
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Help us fix issues and improve {siteName} for everyone.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-white/50">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Bug className="h-6 w-6 text-blue-600" />
                  </div>
                  Bug Report Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-medium">Bug Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Brief summary of the issue"
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="severity" className="text-base font-medium">Severity *</Label>
                      <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="How severe is this bug?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                          <SelectItem value="medium">Medium - Affects functionality</SelectItem>
                          <SelectItem value="high">High - Breaks core features</SelectItem>
                          <SelectItem value="critical">Critical - App unusable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="toolAffected" className="text-base font-medium">Tool Affected</Label>
                      <Select value={formData.toolAffected} onValueChange={(value) => handleInputChange("toolAffected", value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select the affected tool" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          <SelectItem value="general">General / Other</SelectItem>
                          {tools.sort((a, b) => a.name.localeCompare(b.name)).map((tool) => (
                            <SelectItem key={tool.id} value={tool.name}>
                              {tool.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-medium">Bug Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what's going wrong..."
                      className="min-h-24 bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stepsToReproduce" className="text-base font-medium">Steps to Reproduce</Label>
                    <Textarea
                      id="stepsToReproduce"
                      value={formData.stepsToReproduce}
                      onChange={(e) => handleInputChange("stepsToReproduce", e.target.value)}
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. See error"
                      className="min-h-32 bg-white font-mono text-sm"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expectedBehavior" className="text-base font-medium">Expected Behavior</Label>
                      <Textarea
                        id="expectedBehavior"
                        value={formData.expectedBehavior}
                        onChange={(e) => handleInputChange("expectedBehavior", e.target.value)}
                        placeholder="What should happen?"
                        className="min-h-24 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="actualBehavior" className="text-base font-medium">Actual Behavior</Label>
                      <Textarea
                        id="actualBehavior"
                        value={formData.actualBehavior}
                        onChange={(e) => handleInputChange("actualBehavior", e.target.value)}
                        placeholder="What actually happens?"
                        className="min-h-24 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="browserInfo" className="text-base font-medium">Browser & Device Information</Label>
                    <Input
                      id="browserInfo"
                      value={formData.browserInfo}
                      onChange={(e) => handleInputChange("browserInfo", e.target.value)}
                      placeholder="e.g., Chrome 120 on Windows 11, Safari on iPhone 14"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-base font-medium">Contact Email (Optional)</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="your@email.com (for updates on the fix)"
                      className="bg-white"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all font-bold">
                    <Bug className="mr-2 h-5 w-5" />
                    Submit Bug Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-2 border-transparent hover:border-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                  Reporting Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Be Detailed</h4>
                    <p className="text-gray-600 text-sm">Include screenshots or error messages if possible.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Steps to Reproduce</h4>
                    <p className="text-gray-600 text-sm">Clear steps help us fix the issue faster.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Check First</h4>
                    <p className="text-gray-600 text-sm">Try refreshing or clearing cache first.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-transparent hover:border-orange-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Severity Levels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-red-50 border border-red-100">
                  <span className="font-bold text-red-700">Critical</span>
                  <span className="text-xs text-red-600">App unusable</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-orange-50 border border-orange-100">
                  <span className="font-bold text-orange-700">High</span>
                  <span className="text-xs text-orange-600">Major feature broken</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-yellow-50 border border-yellow-100">
                  <span className="font-bold text-yellow-700">Medium</span>
                  <span className="text-xs text-yellow-600">Partial issue</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-blue-50 border border-blue-100">
                  <span className="font-bold text-blue-700">Low</span>
                  <span className="text-xs text-blue-600">Visual/Minor</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-transparent hover:border-green-200 transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Critical</span>
                    <span className="font-medium text-gray-900">~24 hours</span>
                  </li>
                  <li className="flex justify-between">
                    <span>High</span>
                    <span className="font-medium text-gray-900">2-3 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Medium</span>
                    <span className="font-medium text-gray-900">~1 week</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Low</span>
                    <span className="font-medium text-gray-900">2-4 weeks</span>
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

export default BugReport;