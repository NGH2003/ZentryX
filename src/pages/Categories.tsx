
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tools, categories } from "@/data/tools";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Shield,
  Type,
  ArrowRightLeft,
  Calculator,
  Palette,
  FileText,
  TrendingUp,
  Zap,
  Wrench,
  Search,
  ArrowRight,
  Star,
  LayoutGrid
} from "lucide-react";

const Categories = () => {
  // Get tools count per category
  const categoryStats = categories.slice(1).map(category => {
    const categoryTools = tools.filter(tool => tool.category === category);
    const averageRating = categoryTools.length > 0
      ? categoryTools.reduce((sum, tool) => sum + tool.rating, 0) / categoryTools.length
      : 0;

    return {
      name: category,
      count: categoryTools.length,
      averageRating: averageRating.toFixed(1),
      tools: categoryTools.slice(0, 3), // Show first 3 tools as preview
      icon: getCategoryIcon(category),
      color: getCategoryColor(category)
    };
  });

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
              <LayoutGrid className="w-4 h-4 inline mr-2" />
              <span aria-label="Announcement">Organized for Efficiency</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-gray-900">Explore Our </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tool Categories
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Browse our collection of {tools.length} professional tools across {categories.length - 1} specialized categories.
              <span className="block mt-2 text-base text-gray-600">Find exactly what you need to get the job done.</span>
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((category, index) => (
            <Card
              key={category.name}
              className="group hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-4 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <Badge variant="secondary" className="text-xs px-3 py-1 bg-white shadow-sm border border-gray-100">
                    {category.count} tools
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="flex items-center mt-1 text-sm font-medium text-gray-500">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
                  {category.averageRating} Average Rating
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  {category.tools.map((tool) => (
                    <div key={tool.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group/item">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-lg group-hover/item:bg-white group-hover/item:shadow-sm transition-all">
                        {tool.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate group-hover/item:text-gray-900">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                  {category.count > 3 && (
                    <div className="pl-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      +{category.count - 3} more tools
                    </div>
                  )}
                </div>

                <Link to={`/tools?category=${encodeURIComponent(category.name)}`}>
                  <Button className="w-full bg-white text-gray-700 border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 font-bold shadow-sm hover:shadow-md transition-all group-hover:border-blue-200">
                    Browse Category
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Helper function to get category icons
function getCategoryIcon(category: string) {
  const iconMap: Record<string, any> = {
    "Security": Shield,
    "Text Tools": Type,
    "Converters": ArrowRightLeft,
    "Math Tools": Calculator,
    "Calculators": Calculator,
    "Design": Palette,
    "Formatters": FileText,
    "SEO Tools": TrendingUp,
    "Generators": Zap,
    "Utilities": Wrench
  };
  return iconMap[category] || Wrench;
}

// Helper function to get category colors
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    "Security": "from-red-500 to-red-600",
    "Text Tools": "from-blue-500 to-blue-600",
    "Converters": "from-green-500 to-green-600",
    "Math Tools": "from-yellow-500 to-yellow-600",
    "Calculators": "from-orange-500 to-orange-600",
    "Design": "from-purple-500 to-purple-600",
    "Formatters": "from-pink-500 to-pink-600",
    "SEO Tools": "from-indigo-500 to-indigo-600",
    "Generators": "from-cyan-500 to-cyan-600",
    "Utilities": "from-slate-500 to-slate-600"
  };
  return colorMap[category] || "from-blue-500 to-blue-600";
}

export default Categories;
