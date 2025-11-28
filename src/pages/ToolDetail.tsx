import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Share, Copy, Download, Heart, ExternalLink, ChevronDown, ChevronRight, Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useRating } from "@/hooks/useRating";
import { useToast } from "@/hooks/use-toast";
import { useTools } from "@/contexts/ToolsContext";
import { categories } from "@/data/tools";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
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
import UnixTimestampConverter from "@/components/tools/UnixTimestampConverter";
import AspectRatioCalculator from "@/components/tools/AspectRatioCalculator";
import DiscountCalculator from "@/components/tools/DiscountCalculator";
import JWTDecoder from "@/components/tools/JWTDecoder";
import TextDiffChecker from "@/components/tools/TextDiffChecker";
import ImageResizer from "@/components/tools/ImageResizer";
import JsonCsvConverter from "@/components/tools/JsonCsvConverter";
import FakeDataGenerator from "@/components/tools/FakeDataGenerator";
import TextToHandwriting from "@/components/tools/TextToHandwriting";
import WheelSpinner from "@/components/tools/WheelSpinner";
import CodeMinifier from "@/components/tools/CodeMinifier";
import ImageFilters from "@/components/tools/ImageFilters";
import ImageToSketch from "@/components/tools/ImageToSketch";
import ImageWatermark from "@/components/tools/ImageWatermark";
import ImageRoundedCorners from "@/components/tools/ImageRoundedCorners";
import ImageCropResize from "@/components/tools/ImageCropResize";
import PasswordStrengthTester from "@/components/tools/PasswordStrengthTester";
import RegexTester from "@/components/tools/RegexTester";
import ColorPaletteExtractor from "@/components/tools/ColorPaletteExtractor";
import ColorShadesGenerator from "@/components/tools/ColorShadesGenerator";
import CsvViewer from "@/components/tools/CsvViewer";
import TextColumnSplitter from "@/components/tools/TextColumnSplitter";
import NotesApp from "@/components/tools/NotesApp";
import TodoApp from "@/components/tools/TodoApp";

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
  44: () => <TimerStopwatch />,
  45: () => <MarkdownToHTML />,
  46: () => <UnixTimestampConverter />,
  47: () => <AspectRatioCalculator />,
  48: () => <DiscountCalculator />,
  49: () => <JWTDecoder />,
  50: () => <TextDiffChecker />,
  51: () => <ImageResizer />,
  52: () => <JsonCsvConverter />,
  53: () => <FakeDataGenerator />,
  54: () => <TextToHandwriting />,
  55: () => <WheelSpinner />,
  56: () => <CodeMinifier />,
  57: () => <ImageFilters />,
  58: () => <ImageToSketch />,
  59: () => <ImageWatermark />,
  60: () => <ImageRoundedCorners />,
  61: () => <ImageCropResize />,
  62: () => <PasswordStrengthTester />,
  63: () => <RegexTester />,
  64: () => <ColorPaletteExtractor />,
  65: () => <ColorShadesGenerator />,
  66: () => <CsvViewer />,
  67: () => <TextColumnSplitter />,
  68: () => <NotesApp />,
  69: () => <TodoApp />
};

const ToolDetail = () => {
  const { category, toolName } = useParams<{ category: string; toolName: string }>();
  const { toast } = useToast();
  const { rateTool, getToolRating } = useRating();
  const { tools, loading } = useTools();

  // Find tool by matching slugified category and name
  const tool = tools.find(t =>
    slugify(t.category) === category &&
    slugify(t.name) === toolName
  );

  const toolId = tool?.id || 0;
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([tool?.category || ""]));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Loading Tool...</h1>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Tool Not Found</h1>
          <p className="text-slate-600 mb-8">The tool you're looking for doesn't exist or hasn't been implemented yet.</p>
          <Link to="/tools">
            <Button className="btn-primary">Browse All Tools</Button>
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />

      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <AdUnit slot="header" />
      </div>

      {/* Breadcrumb & Back */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#3A7AFE] flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/tools" className="hover:text-[#3A7AFE]">Tools</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-medium">{tool.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8">
            {/* Tool Header */}
            <div className="bg-white rounded-2xl p-8 mb-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex items-start space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-4xl shadow-inner border border-blue-100">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-slate-900">{tool.name}</h1>
                      {tool.featured && (
                        <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1 fill-white" /> Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-600 text-lg mb-4 leading-relaxed">{tool.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                        <Users className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{tool.uses.toLocaleString()} uses</span>
                      </div>
                      <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                        <Badge variant="secondary" className="bg-transparent p-0 text-slate-600 hover:bg-transparent font-normal">
                          {tool.category}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Rating
                          value={getToolRating(tool.id).averageRating}
                          count={getToolRating(tool.id).ratingCount}
                          userRating={getToolRating(tool.id).userRating}
                          onRate={(rating) => rateTool(tool.id, rating)}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 self-start">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFavorite}
                    className={`rounded-xl border-2 ${isFavorited ? "border-red-200 bg-red-50 text-red-500" : "border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200"}`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareUrl}
                    className="rounded-xl border-2 border-slate-200 text-slate-400 hover:text-[#3A7AFE] hover:border-[#3A7AFE]"
                  >
                    <Share className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tool Page Ad */}
            <AdUnit slot="toolPage" className="mb-8" />

            {/* Tool Interface */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
              {ToolComponent ? <ToolComponent /> : <div className="p-8 text-center text-slate-500">Tool component not found or implementation pending.</div>}
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sidebar Ad */}
            <AdUnit slot="sidebar" />

            {/* Quick Actions */}
            <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-[#3A7AFE] hover:border-[#3A7AFE] hover:bg-blue-50 transition-all" onClick={shareUrl}>
                  <Share className="w-4 h-4 mr-3" />
                  Share Tool
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-[#3A7AFE] hover:border-[#3A7AFE] hover:bg-blue-50 transition-all">
                  <ExternalLink className="w-4 h-4 mr-3" />
                  Open in New Tab
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-[#3A7AFE] hover:border-[#3A7AFE] hover:bg-blue-50 transition-all">
                  <Download className="w-4 h-4 mr-3" />
                  Export Results
                </Button>
              </CardContent>
            </Card>

            {/* Tools by Category */}
            <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">More Tools</CardTitle>
                <CardDescription>Explore other tools in {tool.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 max-h-[500px] overflow-y-auto custom-scrollbar">
                {toolsByCategory.map((category) => (
                  <div key={category.name} className="border-b border-slate-100 last:border-0">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-700">{category.name}</span>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-xs font-normal">
                          {category.count}
                        </Badge>
                      </div>
                      {expandedCategories.has(category.name) ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {expandedCategories.has(category.name) && (
                      <div className="px-4 pb-4 space-y-2 bg-slate-50/50">
                        {category.tools.slice(0, 5).map((categoryTool) => (
                          <Link
                            key={categoryTool.id}
                            to={(categoryTool as any).path || getToolUrl(categoryTool.category, categoryTool.name)}
                            className={`block p-3 rounded-xl border transition-all ${categoryTool.id === toolId
                              ? "bg-white border-[#3A7AFE] shadow-sm ring-1 ring-[#3A7AFE]/20"
                              : "bg-white border-slate-200 hover:border-[#3A7AFE] hover:shadow-sm"
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{categoryTool.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${categoryTool.id === toolId ? "text-[#3A7AFE]" : "text-slate-700"
                                  }`}>
                                  {categoryTool.name}
                                </p>
                                <div className="flex items-center mt-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                                  <span className="text-xs text-slate-500">
                                    {getToolRating(categoryTool.id).averageRating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                        {category.tools.length > 5 && (
                          <Link
                            to={`/tools?category=${encodeURIComponent(category.name)}`}
                            className="block py-2 text-center text-sm font-medium text-[#3A7AFE] hover:text-[#1D4ED8] hover:underline"
                          >
                            View all {category.tools.length} tools
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <AdUnit slot="footer" />
      </div>
      <Footer />
    </div>
  );
};

export default ToolDetail;
