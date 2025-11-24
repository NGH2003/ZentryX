
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useRating } from "@/hooks/useRating";
import { tools } from "@/data/tools";
import Navigation from "@/components/Navigation";
import { useBranding } from "@/contexts/BrandingContext";
import { AdUnit } from "@/components/AdUnit";
import { getToolUrl } from "@/lib/url-utils";

const Tool = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { rateTool, getToolRating } = useRating();
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <AdUnit slot="header" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tools</h1>
          <p className="text-gray-600 text-lg">
            Browse all {tools.length} available tools
          </p>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{tool.icon}</div>
                    <div>
                      {tool.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs mb-1">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <Rating
                    value={getToolRating(tool.id).averageRating}
                    count={getToolRating(tool.id).ratingCount}
                    userRating={getToolRating(tool.id).userRating}
                    onRate={(rating) => rateTool(tool.id, rating)}
                    size="sm"
                  />
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tool.uses.toLocaleString()}</span>
                  </div>
                </div>
                <Link to={getToolUrl(tool.category, tool.name)}>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    Use Tool
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <AdUnit slot="footer" />
      </div>
    </div>
  );
};

export default Tool;
