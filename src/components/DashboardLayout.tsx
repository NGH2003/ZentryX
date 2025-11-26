import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  Shield,
  Briefcase
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBranding } from "@/contexts/BrandingContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { branding } = useBranding();
  const siteName = branding.siteName || "ToolBox";

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: "Overview", href: "/profile", icon: LayoutDashboard },
    { name: "My Tools", href: "/profile/tools", icon: Briefcase },
    { name: "Settings", href: "/profile/settings", icon: Settings },
    { name: "Subscription", href: "/profile/billing", icon: CreditCard },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  const adminNavigation = [
    { name: "Admin Panel", href: "/backend", icon: Shield },
    { name: "All Users", href: "/backend/users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"
          } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen ? (
            <>
              <Link to="/" className="flex items-center space-x-2">
                {branding.logo ? (
                  <img
                    src={branding.logo}
                    alt={siteName}
                    style={{ width: `${branding.logoWidth}px`, maxWidth: '100%' }}
                    className="h-auto object-contain"
                  />
                ) : (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{siteName.charAt(0)}</span>
                    </div>
                    <span className="font-bold text-lg">{siteName}</span>
                  </>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="mx-auto"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}

          {/* Admin Section - Only show for admins */}
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-border">
              {sidebarOpen && (
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Admin
                </p>
              )}
              {adminNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                      }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full ${sidebarOpen ? "justify-start" : "justify-center"
              }`}
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
