import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Share, Copy, Download, Heart, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useRating } from "@/hooks/useRating";
import { useToast } from "@/hooks/use-toast";
import { tools, categories } from "@/data/tools";
import Navigation from "@/components/Navigation";
import { AdUnit } from "@/components/AdUnit";
import { getToolUrl, slugify } from "@/lib/url-utils";

// Import tool components
import TextCaseConverter from "@/components/tools/TextCaseConverter";
import WordCounter from "@/components/tools/WordCounter";
import BasicCalculator from "@/components/tools/BasicCalculator";
import ColorPicker from "@/components/tools/ColorPicker";
import UUIDGenerator from "@/components/tools/UUIDGenerator";
import RemoveDuplicateLines from "@/components/tools/RemoveDuplicateLines";
import TextReverser from "@/components/tools/TextReverser";
import LoremIpsumGenerator from "@/components/tools/LoremIpsumGenerator";
import Base64EncodeDecode from "@/components/tools/Base64EncodeDecode";
import URLEncodeDecode from "@/components/tools/URLEncodeDecode";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import RandomNumberGenerator from "@/components/tools/RandomNumberGenerator";
import ContrastChecker from "@/components/tools/ContrastChecker";
import HashGenerator from "@/components/tools/HashGenerator";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import JSONFormatter from "@/components/tools/JSONFormatter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import HTMLEntityEncoder from "@/components/tools/HTMLEntityEncoder";
import WordCountGoalTracker from "@/components/tools/WordCountGoalTracker";
import MarkdownToHTML from "@/components/tools/MarkdownToHTML";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import SlugGenerator from "@/components/tools/SlugGenerator";
import LengthConverter from "@/components/tools/LengthConverter";
import WeightConverter from "@/components/tools/WeightConverter";
import TemperatureConverter from "@/components/tools/TemperatureConverter";
import SpeedConverter from "@/components/tools/SpeedConverter";
import VolumeConverter from "@/components/tools/VolumeConverter";
import BaseConverter from "@/components/tools/BaseConverter";
import PrimeChecker from "@/components/tools/PrimeChecker";
import RomanNumeralConverter from "@/components/tools/RomanNumeralConverter";
import AgeCalculator from "@/components/tools/AgeCalculator";
import BMICalculator from "@/components/tools/BMICalculator";
import LoanCalculator from "@/components/tools/LoanCalculator";
import TipCalculator from "@/components/tools/TipCalculator";
import HexToRgbConverter from "@/components/tools/HexToRgbConverter";
import ColorPaletteGenerator from "@/components/tools/ColorPaletteGenerator";
import GradientGenerator from "@/components/tools/GradientGenerator";
import HTMLFormatter from "@/components/tools/HTMLFormatter";
import CSSBeautifier from "@/components/tools/CSSBeautifier";
import JavaScriptBeautifier from "@/components/tools/JavaScriptBeautifier";
import MetaTagGenerator from "@/components/tools/MetaTagGenerator";
import OpenGraphPreview from "@/components/tools/OpenGraphPreview";
import RobotsTxtGenerator from "@/components/tools/RobotsTxtGenerator";
import TimerStopwatch from "@/components/tools/TimerStopwatch";

// Map tool IDs to their components
const toolComponents: Record<number, React.ComponentType> = {
  1: PasswordGenerator,
  2: () => <HashGenerator />,
  3: () => <HashGenerator />,
  4: () => <Base64EncodeDecode />,
  5: () => <JSONFormatter />,
  6: () => <TextCaseConverter />,
  7: () => <WordCounter />,
  8: () => <RemoveDuplicateLines />,
  9: () => <TextReverser />,
  10: () => <LoremIpsumGenerator />,
  11: () => <ImageCompressor />,
  12: () => <Base64EncodeDecode />,
  13: () => <URLEncodeDecode />,
  14: () => <SlugGenerator />,
  15: () => <LengthConverter />,
  16: () => <WeightConverter />,
  17: () => <TemperatureConverter />,
  18: () => <SpeedConverter />,
  19: () => <VolumeConverter />,
  20: () => <BaseConverter />,
  21: () => <PercentageCalculator />,
  22: () => <RandomNumberGenerator />,
  23: () => <PrimeChecker />,
  24: () => <RomanNumeralConverter />,
  25: () => <BasicCalculator />,
  26: () => <AgeCalculator />,
  27: () => <BMICalculator />,
  28: () => <LoanCalculator />,
  29: () => <TipCalculator />,
  30: () => <ColorPicker />,
  31: () => <HexToRgbConverter />,
  32: () => <ColorPaletteGenerator />,
  33: () => <GradientGenerator />,
  34: () => <ContrastChecker />,
  35: () => <HTMLEntityEncoder />,
  36: () => <HTMLFormatter />,
  37: () => <CSSBeautifier />,
  38: () => <JavaScriptBeautifier />,
  39: () => <MetaTagGenerator />,
  40: () => <OpenGraphPreview />,
  41: () => <RobotsTxtGenerator />,
  42: () => <QRCodeGenerator />,
  43: () => <UUIDGenerator />,
  44: () => <TimerStopwatch />
};

const relatedTools = [
  { id: 2, name: "MD5 Hash Generator", icon: "🔒", category: "Security" },
  { id: 22, name: "Random Number Generator", icon: "🎲", category: "Math Tools" },
  { id: 43, name: "UUID Generator", icon: "🆔", category: "Generators" }
];

const ToolDetail = () => {
  const { category, toolName } = useParams<{ category: string; toolName: string }>();
  const { toast } = useToast();
  const { rateTool, getToolRating } = useRating();

  // Find tool by matching slugified category and name
  const tool = tools.find(t =>
    slugify(t.category) === category &&
    slugify(t.name) === toolName
  );

  const toolId = tool?.id || 0;
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([tool?.category || ""]));

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
          <p className="text-gray-600 mb-8">The tool you're looking for doesn't exist or hasn't been implemented yet.</p>
          <Link to="/tools">
            <Button>Browse All Tools</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Tool URL copied to clipboard"
    });
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Tool removed from your favorites" : "Tool added to your favorites"
    });
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Get tools organized by category
  const toolsByCategory = categories.slice(1).map(category => {
    const categoryTools = tools.filter(tool => tool.category === category);
    return {
      name: category,
      tools: categoryTools,
      count: categoryTools.length
    };
  }).filter(cat => cat.count > 0);

  // Get the component for this tool
  const ToolComponent = toolComponents[toolId];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <AdUnit slot="header" />
      </div>
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/tools" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
            <span>Back to Tools</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tool Header */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                      {tool.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <Rating
                        value={getToolRating(tool.id).averageRating}
                        count={getToolRating(tool.id).ratingCount}
                        userRating={getToolRating(tool.id).userRating}
                        onRate={(rating) => rateTool(tool.id, rating)}
                        size="md"
                      />
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{tool.uses.toLocaleString()} uses</span>
                      </div>
                      <Badge variant="secondary">{tool.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-base">{tool.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFavorite}
                    className={isFavorited ? "text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={shareUrl}>
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tool Page Ad */}
            <AdUnit slot="toolPage" className="mb-8" />

            {/* Tool Interface */}
            <ToolComponent />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sidebar Ad */}
            <AdUnit slot="sidebar" />
            {/* Quick Actions */}
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={shareUrl}>
                  <Share className="w-4 h-4 mr-2" />
                  Share Tool
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              </CardContent>
            </Card>

            {/* Tools by Category */}
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Browse Tools by Category</CardTitle>
                <CardDescription>Discover more tools organized by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {toolsByCategory.map((category) => (
                  <div key={category.name} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                      {expandedCategories.has(category.name) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {expandedCategories.has(category.name) && (
                      <div className="px-3 pb-3 space-y-2">
                        {category.tools.slice(0, 5).map((categoryTool) => (
                          <Link
                            key={categoryTool.id}
                            to={getToolUrl(categoryTool.category, categoryTool.name)}
                            className={`block p-2 rounded border transition-colors ${categoryTool.id === toolId
                              ? "bg-blue-50 border-blue-200"
                              : "border-gray-100 hover:bg-gray-50"
                              }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{categoryTool.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${categoryTool.id === toolId ? "text-blue-700" : "text-gray-900"
                                  }`}>
                                  {categoryTool.name}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <Rating
                                    value={getToolRating(categoryTool.id).averageRating}
                                    count={getToolRating(categoryTool.id).ratingCount}
                                    readonly
                                    size="sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                        {category.tools.length > 5 && (
                          <Link
                            to={`/tools?category=${encodeURIComponent(category.name)}`}
                            className="block p-2 text-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            View all {category.tools.length} {category.name} tools →
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tool Stats */}
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg">Tool Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Uses</span>
                  <span className="font-semibold">{tool.uses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex flex-col items-end">
                    <Rating
                      value={getToolRating(tool.id).averageRating}
                      count={getToolRating(tool.id).ratingCount}
                      readonly
                      size="sm"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold">{tool.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated</span>
                  <span className="font-semibold">Today</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <AdUnit slot="footer" />
      </div>
    </div>
  );
};

export default ToolDetail;
