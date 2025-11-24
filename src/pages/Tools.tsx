import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ChevronDown, ChevronRight, Home, Sparkles, Star, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { tools, categories } from "@/data/tools";

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
  44: () => <TimerStopwatch />,
};

import { useBranding } from "@/contexts/BrandingContext";
import { AdUnit } from "@/components/AdUnit";

const ToolsSidebar = ({
  selectedToolId,
  onToolSelect,
  searchTerm,
  onSearchChange
}: {
  selectedToolId: number | null;
  onToolSelect: (toolId: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories.slice(1)));
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toolsByCategory = categories.slice(1).map(category => ({
    name: category,
    tools: filteredTools.filter(tool => tool.category === category)
  })).filter(cat => cat.tools.length > 0);

  return (
    <Sidebar className="border-r border-gray-200/50 shadow-lg">
      <SidebarContent className="bg-gradient-to-b from-white to-gray-50/50">
        <div className="p-6 border-b border-gray-200/50">
          <Link to="/" className="flex items-center space-x-3 mb-6 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
              <span className="text-white font-bold text-base">{siteName.charAt(0)}</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {siteName}
            </h1>
          </Link>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search 40+ tools..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base rounded-lg shadow-sm"
            />
          </div>
          {searchTerm && (
            <div className="mt-3 text-sm text-gray-600">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {toolsByCategory.map((category) => (
          <SidebarGroup key={category.name}>
            <SidebarGroupLabel
              className="cursor-pointer hover:bg-blue-50/50 flex items-center justify-between px-6 py-3 text-base font-semibold transition-all rounded-lg mx-2 group"
              onClick={() => toggleCategory(category.name)}
            >
              <span className="group-hover:text-blue-600 transition-colors">{category.name}</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-700 border-0">
                  {category.tools.length}
                </Badge>
                {expandedCategories.has(category.name) ? (
                  <ChevronDown className="w-5 h-5 text-blue-600 transition-transform" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                )}
              </div>
            </SidebarGroupLabel>
            {expandedCategories.has(category.name) && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.tools.map((tool) => (
                    <SidebarMenuItem key={tool.id}>
                      <SidebarMenuButton
                        onClick={() => onToolSelect(tool.id)}
                        isActive={selectedToolId === tool.id}
                        className="w-full text-base py-3 px-4 mx-2 rounded-lg transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group"
                      >
                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                        <span className="flex-1 text-left truncate group-hover:text-blue-600 transition-colors">{tool.name}</span>
                        {tool.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 bg-gray-50/50 border-t border-gray-200/50">
        <AdUnit slot="sidebar" />
      </SidebarFooter>
    </Sidebar >
  );
};

const ToolsContent = ({ selectedToolId, onToolSelect }: { selectedToolId: number | null; onToolSelect?: (toolId: number) => void }) => {
  const tool = tools.find(t => t.id === selectedToolId);

  if (!selectedToolId || !tool) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="text-center max-w-3xl px-6 relative z-10">
          <div className="text-9xl mb-8 animate-bounce-slow">🛠️</div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Select a Tool to Get Started
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Choose any tool from the sidebar to start using it. All tools are free and work directly in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="px-6 py-3 text-base bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              40+ Tools Available
            </Badge>
            <Badge className="px-6 py-3 text-base bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              No Sign-up Required
            </Badge>
            <Badge className="px-6 py-3 text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 shadow-lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              100% Free
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {tools.filter(t => t.featured).slice(0, 4).map((featuredTool) => (
              <button
                key={featuredTool.id}
                onClick={() => onToolSelect?.(featuredTool.id)}
                className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 group border border-gray-200"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{featuredTool.icon}</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{featuredTool.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const ToolComponent = toolComponents[tool.id];

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      <AdUnit slot="header" className="mb-8" />
      {/* Tool Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl p-8 shadow-lg border border-gray-200/50 backdrop-blur-sm">
          <div className="flex items-start space-x-6 mb-4">
            <div className="text-6xl animate-bounce-slow">{tool.icon}</div>
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">{tool.name}</h1>
                {tool.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-base border-0 shadow-md">
                    <Star className="w-4 h-4 mr-1 fill-white" />
                    Featured
                  </Badge>
                )}
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 text-base px-4 py-2 shadow-sm">
                  {tool.category}
                </Badge>
              </div>
              <p className="text-gray-700 text-lg md:text-xl mb-4 leading-relaxed">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm px-3 py-1 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdUnit slot="toolPage" className="mb-8" />

      {/* Tool Component */}
      <div className="transition-all duration-300">
        <ToolComponent />
      </div>

      <AdUnit slot="footer" className="mt-12" />
    </div>
  );
};

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const toolIdParam = searchParams.get('tool');
    if (toolIdParam) {
      const toolId = parseInt(toolIdParam);
      if (tools.find(t => t.id === toolId)) {
        setSelectedToolId(toolId);
      }
    }
  }, [searchParams]);

  const handleToolSelect = (toolId: number) => {
    setSelectedToolId(toolId);
    setSearchParams({ tool: toolId.toString() });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <ToolsSidebar
          selectedToolId={selectedToolId}
          onToolSelect={handleToolSelect}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-8 py-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <SidebarTrigger className="hover:bg-blue-50 transition-colors" />
                <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium">Home</span>
                </Link>
                {selectedToolId && (
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Currently using
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <ToolsContent selectedToolId={selectedToolId} onToolSelect={handleToolSelect} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Tools;
