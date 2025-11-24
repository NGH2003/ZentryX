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
    Zap
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
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            {branding.siteIcon || branding.favicon ? (
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden bg-white border border-gray-200">
                                    <img
                                        src={branding.siteIcon || branding.favicon}
                                        alt="Site Icon"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            const parent = (e.target as HTMLImageElement).parentElement;
                                            if (parent) {
                                                parent.innerHTML = '<div class="flex items-center justify-center w-full h-full bg-blue-600"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div>';
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                                    <Shield className="size-4 text-white" />
                                </div>
                            )}
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{siteName} Admin</span>
                                <span className="truncate text-xs">Enterprise Edition</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "overview"}
                                    onClick={() => setActiveTab("overview")}
                                    tooltip="Dashboard"
                                >
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "tools"}
                                    onClick={() => setActiveTab("tools")}
                                    tooltip="Tools"
                                >
                                    <Wrench />
                                    <span>Tools Management</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "reported-tools"}
                                    onClick={() => setActiveTab("reported-tools")}
                                    tooltip="Reported Tools"
                                >
                                    <Flag />
                                    <span>Reported Tools</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "ads"}
                                    onClick={() => setActiveTab("ads")}
                                    tooltip="Ads Management"
                                >
                                    <Zap />
                                    <span>Ads Management</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "analytics"}
                                    onClick={() => setActiveTab("analytics")}
                                    tooltip="Analytics"
                                >
                                    <BarChart2 />
                                    <span>Analytics</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Website</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "website-branding"}
                                    onClick={() => setActiveTab("website-branding")}
                                    tooltip="Branding"
                                >
                                    <Palette />
                                    <span>Branding</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "blog"}
                                    onClick={() => setActiveTab("blog")}
                                    tooltip="Blog"
                                >
                                    <FileText />
                                    <span>Blog</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeTab === "website-footer"}
                                    onClick={() => setActiveTab("website-footer")}
                                    tooltip="Footer"
                                >
                                    <Globe />
                                    <span>Footer</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Settings">
                                    <Settings />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            isActive={activeTab === "settings-general"}
                                            onClick={() => setActiveTab("settings-general")}
                                        >
                                            <Globe className="w-4 h-4 mr-2" />
                                            <span>General</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>

                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            isActive={activeTab === "settings-notifications"}
                                            onClick={() => setActiveTab("settings-notifications")}
                                        >
                                            <Bell className="w-4 h-4 mr-2" />
                                            <span>Notifications</span>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                            isActive={activeTab === "settings-security"}
                                            onClick={() => setActiveTab("settings-security")}
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
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                                <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Admin User</span>
                                <span className="truncate text-xs">{adminEmail}</span>
                            </div>
                            <LogOut className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
