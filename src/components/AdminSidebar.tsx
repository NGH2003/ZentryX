import {
    LayoutDashboard,
    Wrench,
    Users,
    BarChart2,
    Settings,
    Shield,
    FileText,
    Bell,
    Palette,
    Globe,
    LogOut,
    Flag,
    Zap,
    Lightbulb,
    Sparkles,
    ChevronRight,
    Activity
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useBranding } from "@/contexts/BrandingContext";

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    const { branding } = useBranding();
    const siteName = branding.siteName || "ToolBox";
    const adminEmail = `admin@${siteName.toLowerCase().replace(/\s+/g, '')}.com`;

    return (
        <Sidebar collapsible="icon" className="border-r border-gray-200/80 shadow-xl">
            {/* Enhanced Header with Gradient */}
            <SidebarHeader className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="relative z-10 data-[state=open]:bg-white/20 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            {branding.siteIcon || branding.favicon ? (
                                <div className="flex aspect-square size-11 items-center justify-center rounded-xl overflow-hidden bg-white shadow-lg ring-2 ring-white/50">
                                    <img
                                        src={branding.siteIcon || branding.favicon}
                                        alt="Site Icon"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            const parent = (e.target as HTMLImageElement).parentElement;
                                            if (parent) {
                                                parent.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div>';
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-square size-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg ring-2 ring-white/50">
                                    <Shield className="size-6 text-white" />
                                </div>
                            )}
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-bold text-white text-base drop-shadow-sm">{siteName} Admin</span>
                                <span className="truncate text-xs text-white/90 flex items-center gap-1.5 font-medium">
                                    <Sparkles className="w-3 h-3 animate-pulse" />
                                    Premium Edition
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Enhanced Content with Better Spacing */}
            <SidebarContent className="bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 px-2 py-4">
                {/* Platform Section */}
                <SidebarGroup className="mb-2">
                    <SidebarGroupLabel className="text-xs font-extrabold text-gray-500 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
                        <Activity className="w-3 h-3" />
                        Platform
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "overview"}
                                    onClick={() => setActiveTab("overview")}
                                    tooltip="Dashboard"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-purple-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-blue-500/30 hover:bg-blue-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <LayoutDashboard className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Dashboard</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "tools"}
                                    onClick={() => setActiveTab("tools")}
                                    tooltip="Tools"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-indigo-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-blue-500/30 hover:bg-blue-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Wrench className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Tools</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "reported-tools"}
                                    onClick={() => setActiveTab("reported-tools")}
                                    tooltip="Reported Tools"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-red-500 data-[active=true]:to-pink-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-red-500/30 hover:bg-red-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/10 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Flag className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Reported</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "feature-requests"}
                                    onClick={() => setActiveTab("feature-requests")}
                                    tooltip="Feature Requests"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-yellow-500 data-[active=true]:to-orange-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-yellow-500/30 hover:bg-yellow-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Lightbulb className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Features</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "ads"}
                                    onClick={() => setActiveTab("ads")}
                                    tooltip="Ads Management"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-green-500 data-[active=true]:to-emerald-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-green-500/30 hover:bg-green-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Zap className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Ads</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "analytics"}
                                    onClick={() => setActiveTab("analytics")}
                                    tooltip="Analytics"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500 data-[active=true]:to-pink-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-purple-500/30 hover:bg-purple-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <BarChart2 className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Analytics</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Website Section */}
                <SidebarGroup className="mb-2">
                    <SidebarGroupLabel className="text-xs font-extrabold text-gray-500 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        Website
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "website-branding"}
                                    onClick={() => setActiveTab("website-branding")}
                                    tooltip="Branding"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-pink-500 data-[active=true]:to-rose-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-pink-500/30 hover:bg-pink-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/10 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Palette className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Branding</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "blog"}
                                    onClick={() => setActiveTab("blog")}
                                    tooltip="Blog"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-indigo-500 data-[active=true]:to-purple-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-indigo-500/30 hover:bg-indigo-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <FileText className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Blog</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "website-footer"}
                                    onClick={() => setActiveTab("website-footer")}
                                    tooltip="Footer"
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-cyan-500 data-[active=true]:to-blue-500 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-cyan-500/30 hover:bg-cyan-50 hover:scale-[1.02] hover:shadow-md mx-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Globe className="group-data-[active=true]:text-white transition-transform group-hover:scale-110" />
                                    <span className="font-semibold relative z-10">Footer</span>
                                    <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-data-[active=true]:opacity-100 transition-all" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Configuration Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-extrabold text-gray-500 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
                        <Settings className="w-3 h-3" />
                        Configuration
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip="Settings"
                                    className="group rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300 mx-1"
                                >
                                    <Settings className="transition-transform group-hover:rotate-90 duration-500" />
                                    <span className="font-semibold">Settings</span>
                                </SidebarMenuButton>
                                <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            isActive={activeTab === "settings-general"}
                                            onClick={() => setActiveTab("settings-general")}
                                            className="rounded-lg data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-blue-50 data-[active=true]:text-blue-700 data-[active=true]:font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            <Globe className="w-4 h-4 mr-2" />
                                            <span>General</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>

                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            isActive={activeTab === "settings-notifications"}
                                            onClick={() => setActiveTab("settings-notifications")}
                                            className="rounded-lg data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-blue-50 data-[active=true]:text-blue-700 data-[active=true]:font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            <Bell className="w-4 h-4 mr-2" />
                                            <span>Notifications</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            isActive={activeTab === "settings-security"}
                                            onClick={() => setActiveTab("settings-security")}
                                            className="rounded-lg data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-blue-50 data-[active=true]:text-blue-700 data-[active=true]:font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            <Shield className="w-4 h-4 mr-2" />
                                            <span>Security</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Enhanced Footer */}
            <SidebarFooter className="border-t-2 border-gray-200/80 bg-gradient-to-r from-gray-50 to-white p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="group relative overflow-hidden rounded-2xl data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Avatar className="h-11 w-11 rounded-xl ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all group-hover:scale-110">
                                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                                <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-base">AD</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight relative z-10">
                                <span className="truncate font-bold text-gray-900 flex items-center gap-2">
                                    Admin User
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] px-1.5 py-0 border-0">
                                        Online
                                    </Badge>
                                </span>
                                <span className="truncate text-xs text-gray-500 font-medium">{adminEmail}</span>
                            </div>
                            <LogOut className="ml-auto size-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
