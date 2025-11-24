import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();
  const { branding } = useBranding();

  const siteName = branding.siteName || "ToolBox";
  const supportEmail = `support@${siteName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-6 py-2 text-sm shadow-lg" role="status">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Get in Touch</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Contact </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-32 bg-white"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-lg">
                  For general inquiries and support requests, you can reach us directly at:
                </p>
                <a href={`mailto:${supportEmail}`} className="text-xl font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {supportEmail}
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <span className="font-medium">General inquiries</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">24 hours</Badge>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <span className="font-medium">Bug reports</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">12 hours</Badge>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <span className="font-medium">Feature requests</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">48 hours</Badge>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <span className="font-medium">Account issues</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">6 hours</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-transparent hover:border-orange-200 hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Alternative Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="group p-3 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2 group-hover:text-orange-600">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <MessageSquare className="w-3 h-3 text-orange-600" />
                    </div>
                    Bug Reports
                  </h4>
                  <p className="text-gray-600 text-sm mb-2 pl-8">Found a bug? Help us fix it quickly</p>
                  <a href="/bug-report" className="text-blue-600 hover:underline text-sm font-medium pl-8">Submit Bug Report →</a>
                </div>

                <div className="group p-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2 group-hover:text-blue-600">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageSquare className="w-3 h-3 text-blue-600" />
                    </div>
                    Feature Requests
                  </h4>
                  <p className="text-gray-600 text-sm mb-2 pl-8">Have an idea for improvement?</p>
                  <a href="/feature-request" className="text-blue-600 hover:underline text-sm font-medium pl-8">Request Feature →</a>
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

export default Contact;