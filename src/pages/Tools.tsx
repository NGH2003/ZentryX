import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { Header, Footer, ToolCard, Button, Input } from "@/components/zentryx";
import { Badge } from "@/components/ui/badge";
import { tools, categories } from "@/data/tools";
import { AdUnit } from "@/components/AdUnit";

// Helper function to generate URL-friendly slugs
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const Tools = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const [toolOverrides, setToolOverrides] = useState<Record<number, any>>({});

  useEffect(() => {
    const saved = localStorage.getItem("toolOverrides");
    if (saved) {
      setToolOverrides(JSON.parse(saved));
    }
  }, []);

  const mergedTools = tools.map(tool =>
    toolOverrides[tool.id] ? { ...tool, ...toolOverrides[tool.id] } : tool
  );

  const filteredTools = mergedTools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <Badge className="px-6 py-2 text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              40+ Professional Tools
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Smart Tools. Zero Effort.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover powerful online tools for developers, designers, and content creators. All free, no sign-up required.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 h-14 text-lg rounded-2xl shadow-xl border-2 border-gray-200 focus:border-blue-400"
              />
            </div>
            {searchTerm && (
              <div className="mt-4 text-gray-600">
                Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Categories Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => {
              const categoryTools = tools.filter((t) => t.category === category);
              const isActive = selectedCategory === category;
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
                "from-green-500 to-emerald-500",
                "from-indigo-500 to-blue-500",
                "from-yellow-500 to-orange-500",
                "from-pink-500 to-rose-500",
                "from-teal-500 to-cyan-500",
              ];

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${isActive
                    ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-lg`
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
                    }`}
                >
                  {category}
                  <span className="ml-2 text-sm opacity-75">({categoryTools.length})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ad Unit */}
        <AdUnit slot="header" className="mb-12" />

        {/* Category Header */}
        {selectedCategory !== "All" && (
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("All")}
              className="mb-4"
            >
              ← All Categories
            </Button>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {selectedCategory}
            </h2>
            <p className="text-gray-600 text-lg mt-2">
              {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} available
            </p>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool: any) => {
            const categorySlug = generateSlug(tool.category);
            const toolSlug = generateSlug(tool.name);
            const toolHref = tool.path || `/tools/${categorySlug}/${toolSlug}`;

            return (
              <ToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                category={tool.category}
                badge={
                  tool.status && ['new', 'beta', 'deprecated'].includes(tool.status.toLowerCase())
                    ? tool.status.toLowerCase()
                    : (tool.featured ? "trending" : undefined)
                }
                featured={tool.featured}
                href={toolHref}
              />
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No tools found</h3>
            <p className="text-gray-500">
              Try adjusting your search or browse all categories
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Tools;
