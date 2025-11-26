import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMaintenance } from "@/contexts/MaintenanceContext";
import { useBranding } from "@/contexts/BrandingContext";
import { useBlog } from "@/contexts/BlogContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { useAds } from "@/contexts/AdsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Wrench,
  Users,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Shield,
  BarChart2,
  Eye,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { tools } from "@/data/tools";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("adminActiveTab") || "overview");

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { isMaintenanceMode, setMaintenanceMode, maintenanceMessage, updateMaintenanceMessage } = useMaintenance();
  const { branding, setBranding: setBrandingContext } = useBranding();
  const { branding, setBranding: setBrandingContext } = useBranding();
  const { blogPosts, setBlogPosts, addPost, updatePost, deletePost } = useBlog();
  const { getDailyUsage, getCategoryDistribution, getTopTools, getTotalViews, getActiveUsers } = useAnalytics();
  const { config: adsConfig, updateConfig, updateSlot } = useAds();

  const [localBranding, setLocalBranding] = useState(branding);
  const [usersCount, setUsersCount] = useState(0);
  const [usageToday, setUsageToday] = useState(0);

  // Tools management state
  const [toolSearch, setToolSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toolsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [enabledTools, setEnabledTools] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem("enabledTools");
    return saved ? JSON.parse(saved) : tools.reduce((acc, tool) => ({ ...acc, [tool.id]: true }), {});
  });

  // Tool editing state
  const [isToolDialogOpen, setIsToolDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<any>(null);
  const [toolOverrides, setToolOverrides] = useState<Record<number, any>>(() => {
    const saved = localStorage.getItem("toolOverrides");
    return saved ? JSON.parse(saved) : {};
  });

  // Blog editing state
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem("toolOverrides", JSON.stringify(toolOverrides));
  }, [toolOverrides]);

  const handleSaveTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool) return;

    setToolOverrides(prev => ({
      ...prev,
      [editingTool.id]: editingTool
    }));
    setIsToolDialogOpen(false);
    toast.success("Tool updated successfully");
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      ...editingPost,
      tags: typeof editingPost.tags === 'string' ? editingPost.tags.split(',').map((t: string) => t.trim()) : editingPost.tags
    };

    if (editingPost.id) {
      updatePost(editingPost.id, formData);
      toast.success("Post updated successfully");
    } else {
      addPost(formData);
      toast.success("Post created successfully");
    }
    setIsBlogDialogOpen(false);
  };

  const openNewPostDialog = () => {
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: branding.siteName + " Team",
      tags: [],
      published: false
    });
    setIsBlogDialogOpen(true);
  };

  useEffect(() => {
    setLocalBranding(branding);
  }, [branding]);

  useEffect(() => {
    // Fetch real stats from Supabase
    async function fetchStats() {
      try {
        // Fetch users count
        const { count: profilesCount, error: profilesError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (!profilesError && profilesCount !== null) {
          setUsersCount(profilesCount);
        }

        // Fetch today's usage
        const today = new Date().toISOString().split("T")[0];
        const { count: logsCount, error: logsError } = await supabase
          .from("usage_logs")
          .select("*", { count: "exact", head: true })
          .gte("created_at", today);

        if (!logsError && logsCount !== null) {
          setUsageToday(logsCount);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    }

    fetchStats();
  }, []);

  const websiteBranding = branding;

  const updateBranding = (key: string, value: any) => {
    setLocalBranding((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveBranding = () => {
    setBrandingContext(localBranding);
    toast.success("Branding updated successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Tools</CardTitle>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{tools.length}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Active
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{usersCount}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Registered
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Usage Today</CardTitle>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{usageToday}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Tool uses
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Maintenance Mode</CardTitle>
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isMaintenanceMode ? "Active" : "Inactive"}</span>
                    <Switch checked={isMaintenanceMode} onCheckedChange={setMaintenanceMode} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "tools":
        // Get unique categories
        const categories = ["all", ...Array.from(new Set(tools.map(t => t.category)))];

        // Filter tools
        const filteredTools = tools.map(tool => toolOverrides[tool.id] ? { ...tool, ...toolOverrides[tool.id] } : tool).filter(tool => {
          const matchesSearch = tool.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
            tool.description.toLowerCase().includes(toolSearch.toLowerCase());
          const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });

        // Pagination
        const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
        const startIndex = (currentPage - 1) * toolsPerPage;
        const paginatedTools = filteredTools.slice(startIndex, startIndex + toolsPerPage);

        // Toggle tool enabled state
        const toggleTool = (toolId: number) => {
          const newState = { ...enabledTools, [toolId]: !enabledTools[toolId] };
          setEnabledTools(newState);
          localStorage.setItem("enabledTools", JSON.stringify(newState));
          toast.success(`Tool ${enabledTools[toolId] ? 'disabled' : 'enabled'} successfully`);
        };

        // Statistics
        const enabledCount = Object.values(enabledTools).filter(Boolean).length;
        const disabledCount = tools.length - enabledCount;

        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tools.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Enabled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{enabledCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Disabled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{disabledCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories.length - 1}</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Tools Card */}
            <Card>
              <CardHeader>
                <CardTitle>Tools Management</CardTitle>
                <CardDescription>Manage your tools and their visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search tools..."
                        value={toolSearch}
                        onChange={(e) => {
                          setToolSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full"
                      />
                    </div>
                    <div className="w-full md:w-48">
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tools List */}
                  <div className="grid gap-3">
                    {paginatedTools.map((tool) => (
                      <div
                        key={tool.id}
                        className={`flex items-center justify-between p-4 border rounded-lg transition-all ${enabledTools[tool.id] ? 'bg-white' : 'bg-gray-50 opacity-60'
                          }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-3xl">{tool.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{tool.name}</h4>
                              {!enabledTools[tool.id] && (
                                <Badge variant="secondary" className="text-xs">Disabled</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                              {tool.featured && (
                                <Badge className="text-xs bg-yellow-100 text-yellow-800">Featured</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingTool(tool);
                              setIsToolDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Switch
                            checked={enabledTools[tool.id] ?? true}
                            onCheckedChange={() => toggleTool(tool.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(startIndex + toolsPerPage, filteredTools.length)} of {filteredTools.length} tools
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-8"
                              >
                                {page}
                              </Button>
                            );
                          })}
                          {totalPages > 5 && <span className="px-2">...</span>}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {filteredTools.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No tools found matching your criteria</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setToolSearch("");
                          setSelectedCategory("all");
                        }}
                        className="mt-2"
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "reported-tools":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reported Tools</CardTitle>
                <CardDescription>Review and manage reported tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No reported tools at this time</p>
              </CardContent>
            </Card>
          </div>
        );

      case "ads":
        // Calculate statistics
        const enabledAdsCount = Object.values(adsConfig.slots).filter(slot => slot.enabled).length;
        const totalSlots = Object.keys(adsConfig.slots).length;

        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Ad Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSlots}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{enabledAdsCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Inactive Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{totalSlots - enabledAdsCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Ad Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-semibold capitalize">{adsConfig.provider}</div>
                </CardContent>
              </Card>
            </div>

            {/* Global Ads Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Global Ad Settings</CardTitle>
                <CardDescription>Configure global advertisement settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-semibold">Enable Advertisements</Label>
                    <p className="text-sm text-muted-foreground">Turn on/off all advertisements globally</p>
                  </div>
                  <Switch
                    checked={adsConfig.enabled}
                    onCheckedChange={(checked) => {
                      const newConfig = { ...adsConfig, enabled: checked };
                      updateConfig(newConfig);
                      toast.success(`Ads ${checked ? 'enabled' : 'disabled'} globally`);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ad Provider</Label>
                  <select
                    value={adsConfig.provider}
                    onChange={(e) => {
                      const newConfig = { ...adsConfig, provider: e.target.value as "google" | "custom" };
                      updateConfig(newConfig);
                      toast.success(`Ad provider changed to ${e.target.value}`);
                    }}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="google">Google AdSense</option>
                    <option value="custom">Custom HTML/JS</option>
                  </select>
                </div>

                {adsConfig.provider === "google" && (
                  <div className="space-y-2">
                    <Label>Google AdSense Publisher ID</Label>
                    <Input
                      value={adsConfig.googleAdSenseId}
                      onChange={(e) => {
                        const newConfig = { ...adsConfig, googleAdSenseId: e.target.value };
                        updateConfig(newConfig);
                      }}
                      placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Find your Publisher ID in your AdSense account
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ad Slots Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Ad Slot Configuration</CardTitle>
                <CardDescription>Configure individual ad placements across your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(adsConfig.slots).map(([key, slot]) => {
                  const slotInfo = {
                    header: { size: "728x90", location: "Top of every page", color: "blue" },
                    sidebar: { size: "300x250", location: "Right sidebar", color: "green" },
                    footer: { size: "728x90", location: "Bottom of every page", color: "gray" },
                    toolPage: { size: "Flexible", location: "Individual tool pages", color: "orange" },
                  }[key] || { size: "Custom", location: "Custom location", color: "purple" };

                  return (
                    <div key={key} className="space-y-3 p-5 border-2 rounded-lg bg-gradient-to-r from-gray-50 to-white">
                      {/* Slot Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-${slotInfo.color}-100 flex items-center justify-center`}>
                            <Zap className={`w-5 h-5 text-${slotInfo.color}-600`} />
                          </div>
                          <div>
                            <Label className="font-bold text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            <p className="text-xs text-muted-foreground">{slotInfo.location} • {slotInfo.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={slot.enabled ? "default" : "secondary"}>
                            {slot.enabled ? "Active" : "Inactive"}
                          </Badge>
                          <Switch
                            checked={slot.enabled}
                            onCheckedChange={(checked) => {
                              updateSlot(key as any, { enabled: checked });
                              toast.success(`${key} ad slot ${checked ? 'enabled' : 'disabled'}`);
                            }}
                          />
                        </div>
                      </div>

                      {/* Ad Code Editor */}
                      <div className="space-y-2">
                        <Label className="text-sm">Ad Code</Label>
                        <Textarea
                          value={slot.code}
                          onChange={(e) => updateSlot(key as any, { code: e.target.value })}
                          placeholder={`Paste your ${adsConfig.provider === 'google' ? 'AdSense' : 'ad'} code here`}
                          className="font-mono text-xs"
                          rows={4}
                        />
                      </div>

                      {/* Live Preview */}
                      {slot.enabled && slot.code && (
                        <div className="space-y-2">
                          <Label className="text-sm">Live Preview</Label>
                          <div className="p-4 border-2 border-dashed rounded-lg bg-white">
                            <div dangerouslySetInnerHTML={{ __html: slot.code }} />
                          </div>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(slot.code);
                            toast.success("Ad code copied to clipboard");
                          }}
                        >
                          Copy Code
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateSlot(key as any, { code: "" });
                            toast.success("Ad code cleared");
                          }}
                        >
                          Clear Code
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Help & Documentation */}
            <Card>
              <CardHeader>
                <CardTitle>Ad Integration Help</CardTitle>
                <CardDescription>Quick guide to setting up advertisements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Google AdSense Setup:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Sign up for Google AdSense at adsense.google.com</li>
                    <li>Get your Publisher ID (starts with ca-pub-)</li>
                    <li>Create ad units in your AdSense dashboard</li>
                    <li>Copy the ad code and paste it in the respective slot above</li>
                    <li>Enable the slot to make it live on your site</li>
                  </ol>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Custom HTML/JS Ads:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Get your ad code from your ad network</li>
                    <li>Paste the complete HTML/JavaScript code in the slot</li>
                    <li>Use the preview to verify it displays correctly</li>
                    <li>Enable the slot to publish it live</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalViews()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getActiveUsers()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tools Used Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getDailyUsage(1).reduce((sum, day) => sum + day.uses, 0)}</div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Top Tools</CardTitle>
                <CardDescription>Most used tools this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getTopTools(5).map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border-b">
                      <span className="font-medium">{tool.name}</span>
                      <Badge>{tool.uses} uses</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings-logs":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>View system activity logs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">System logs - Coming soon</p>
              </CardContent>
            </Card>
          </div>
        );

      case "website-branding":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Branding</CardTitle>
                <CardDescription>Customize your website appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={localBranding.siteName}
                    onChange={(e) => updateBranding("siteName", e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={localBranding.tagline}
                    onChange={(e) => updateBranding("tagline", e.target.value)}
                    placeholder="Enter tagline"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-semibold">Show Site Name</Label>
                    <p className="text-sm text-muted-foreground">Toggle site name visibility in navigation</p>
                  </div>
                  <Switch
                    checked={localBranding.showSiteName}
                    onCheckedChange={(checked) => updateBranding("showSiteName", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input
                    value={localBranding.logo || ""}
                    onChange={(e) => updateBranding("logo", e.target.value)}
                    placeholder="Enter logo URL"
                  />
                  {localBranding.logo && (
                    <div className="mt-2">
                      <Label className="text-xs text-muted-foreground mb-1 block">Preview (Actual Size):</Label>
                      <div className="p-4 border rounded-lg bg-gray-50/50 flex items-center">
                        <img
                          src={localBranding.logo}
                          alt="Logo Preview"
                          style={{ width: `${localBranding.logoWidth}px` }}
                          className="h-auto object-contain transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Logo Width (px)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={localBranding.logoWidth}
                      onChange={(e) => updateBranding("logoWidth", parseInt(e.target.value) || 120)}
                      className="w-32"
                      min={20}
                      max={300}
                    />
                    <span className="text-sm text-muted-foreground">Default: 120px</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Site Icon URL (Favicon/Nav Icon)</Label>
                  <div className="flex gap-3">
                    <Input
                      value={localBranding.siteIcon || ""}
                      onChange={(e) => updateBranding("siteIcon", e.target.value)}
                      placeholder="Enter icon URL (optional)"
                    />
                    {localBranding.siteIcon && (
                      <div className="w-10 h-10 border rounded flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                        <img
                          src={localBranding.siteIcon}
                          alt="Icon"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={handleSaveBranding} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "blog":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>Manage blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {blogPosts.length} blog post{blogPosts.length !== 1 ? "s" : ""} published
                    </p>
                    <Button onClick={openNewPostDialog} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" /> New Post
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-24 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{post.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                          <div className="flex gap-2 mt-2">
                            {post.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingPost(post);
                              setIsBlogDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this post?')) {
                                deletePost(post.id);
                                toast.success('Post deleted successfully');
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "website-footer":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Footer Customization</CardTitle>
                <CardDescription>Customize your website footer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Footer Logo URL</Label>
                  <div className="flex gap-3">
                    <Input
                      value={localBranding.footerLogo || ""}
                      onChange={(e) => updateBranding("footerLogo", e.target.value)}
                      placeholder="Enter footer logo URL (optional)"
                    />
                    {localBranding.footerLogo && (
                      <div className="w-10 h-10 border rounded flex items-center justify-center bg-gray-800 overflow-hidden shrink-0">
                        <img
                          src={localBranding.footerLogo}
                          alt="Footer Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Footer Logo Width (px)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={localBranding.footerLogoWidth || 120}
                      onChange={(e) => updateBranding("footerLogoWidth", parseInt(e.target.value) || 120)}
                      className="w-32"
                      min={20}
                      max={300}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Footer Background Start Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={localBranding.footerBgColor1 || "#111827"}
                        onChange={(e) => updateBranding("footerBgColor1", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={localBranding.footerBgColor1 || "#111827"}
                        onChange={(e) => updateBranding("footerBgColor1", e.target.value)}
                        placeholder="#111827"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Footer Background End Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={localBranding.footerBgColor2 || "#111827"}
                        onChange={(e) => updateBranding("footerBgColor2", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={localBranding.footerBgColor2 || "#111827"}
                        onChange={(e) => updateBranding("footerBgColor2", e.target.value)}
                        placeholder="#111827"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Footer Text</Label>
                  <Textarea
                    value={localBranding.footerText || ""}
                    onChange={(e) => updateBranding("footerText", e.target.value)}
                    placeholder="Footer description text"
                    rows={3}
                  />
                </div>
                <Button onClick={handleSaveBranding} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "settings-general":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage general application settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="text-base font-semibold">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode to block public access</p>
                    </div>
                    <Switch checked={isMaintenanceMode} onCheckedChange={setMaintenanceMode} />
                  </div>

                  <div className="space-y-2">
                    <Label>Maintenance Message</Label>
                    <Textarea
                      value={maintenanceMessage}
                      onChange={(e) => updateMaintenanceMessage(e.target.value)}
                      placeholder="We're currently performing scheduled maintenance..."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">This message will be displayed to users when maintenance mode is active.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings-notifications":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about critical system events</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={(c) => toast.success(c ? "Email alerts enabled" : "Email alerts disabled")} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications for real-time updates</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={(c) => toast.success(c ? "Push notifications enabled" : "Push notifications disabled")} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                  </div>
                  <Switch onCheckedChange={(c) => toast.success(c ? "Marketing emails enabled" : "Marketing emails disabled")} />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Email Preferences</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Notification Email</Label>
                      <div className="flex gap-2">
                        <Input defaultValue={`admin@${branding.siteName.toLowerCase().replace(/\s+/g, "")}.com`} />
                        <Button variant="outline">Update</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings-security":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button onClick={() => toast.success("Password updated successfully")}>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="font-semibold">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch onCheckedChange={(checked) => toast.info(checked ? "2FA Enabled" : "2FA Disabled")} />
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input type="number" defaultValue={30} className="max-w-[200px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarInset className="bg-transparent">
            {/* Maintenance Mode Banner */}
            {isMaintenanceMode && (
              <div className="bg-orange-500 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>⚠️ MAINTENANCE MODE ACTIVE - Public site is offline for non-admin users</span>
              </div>
            )}

            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <h2 className="font-semibold text-lg capitalize">{activeTab.replace("-", " ")}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5 text-gray-500" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" alt="@admin" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">Admin User</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {`admin@${branding.siteName.toLowerCase().replace(/\s+/g, "")}.com`}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setActiveTab("settings-general")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          signOut();
                          navigate("/login");
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            <div key={activeTab} className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">{renderContent()}</div>
          </SidebarInset>
        </div>

        {/* Tool Edit Dialog */}
        <Dialog open={isToolDialogOpen} onOpenChange={setIsToolDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Tool</DialogTitle>
              <DialogDescription>
                Make changes to the tool details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingTool && (
              <form onSubmit={handleSaveTool} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tool-name">Name</Label>
                  <Input
                    id="tool-name"
                    value={editingTool.name}
                    onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-description">Description</Label>
                  <Textarea
                    id="tool-description"
                    value={editingTool.description}
                    onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-category">Category</Label>
                  <Input
                    id="tool-category"
                    value={editingTool.category}
                    onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <Label htmlFor="tool-featured">Featured Tool</Label>
                  <Switch
                    id="tool-featured"
                    checked={editingTool.featured || false}
                    onCheckedChange={(checked) => setEditingTool({ ...editingTool, featured: checked })}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Blog Post Dialog */}
        <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost?.id ? 'Edit Post' : 'Create New Post'}</DialogTitle>
              <DialogDescription>
                Write and manage your blog post content.
              </DialogDescription>
            </DialogHeader>
            {editingPost && (
              <form onSubmit={handleSavePost} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-slug">Slug</Label>
                    <Input
                      id="post-slug"
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-excerpt">Excerpt</Label>
                  <Textarea
                    id="post-excerpt"
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-content">Content (Markdown supported)</Label>
                  <Textarea
                    id="post-content"
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-image">Cover Image URL</Label>
                    <Input
                      id="post-image"
                      value={editingPost.coverImage}
                      onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-author">Author</Label>
                    <Input
                      id="post-author"
                      value={editingPost.author}
                      onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-tags">Tags (comma separated)</Label>
                  <Input
                    id="post-tags"
                    value={Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : editingPost.tags}
                    onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-0.5">
                    <Label htmlFor="post-published" className="text-base">Published</Label>
                    <p className="text-sm text-muted-foreground">Make this post visible to the public</p>
                  </div>
                  <Switch
                    id="post-published"
                    checked={editingPost.published}
                    onCheckedChange={(checked) => setEditingPost({ ...editingPost, published: checked })}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">Save Post</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

      </SidebarProvider>
    </>
  );
};

export default Admin;
