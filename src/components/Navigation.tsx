import { Home, Wrench, Grid, Bug, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useBranding } from "@/contexts/BrandingContext";

const Navigation = () => {
  const location = useLocation();
  const { branding } = useBranding();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/tools", label: "Tools", icon: Wrench },
    { path: "/categories", label: "Categories", icon: Grid },
    { path: "/blog", label: "Blog", icon: BookOpen },
    { path: "/bug-report", label: "Report Bug", icon: Bug },
  ];

  // Get first letter of site name for fallback logo
  const firstLetter = (branding.siteName || "ToolBox").charAt(0).toUpperCase();

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Brand Logo/Icon */}
            {branding.logo ? (
              <img
                key={branding.logo}
                src={branding.logo}
                alt={`${branding.siteName} logo`}
                style={{ width: `${branding.logoWidth}px` }}
                className="h-auto object-contain transform transition-transform group-hover:scale-105"
              />
            ) : branding.siteIcon ? (
              <img
                key={branding.siteIcon}
                src={branding.siteIcon}
                alt={`${branding.siteName} icon`}
                style={{ width: `${branding.logoWidth}px` }}
                className="h-auto object-contain transform transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                <span className="text-white font-bold text-base">{firstLetter}</span>
              </div>
            )}

            {/* Site Name */}
            {branding.showSiteName && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {branding.siteName || "ToolBox"}
              </h1>
            )}
          </Link>

          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${active
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200/50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;