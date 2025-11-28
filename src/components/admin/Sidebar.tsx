import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Wrench,
    FileText,
    DollarSign,
    BarChart3,
    Users,
    Settings,
    ChevronLeft,
    LogOut,
    Palette,
    Layout,
    AlertTriangle,
    Bot,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    isMobile: boolean;
    closeMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    isCollapsed,
    toggleCollapse,
    isMobile,
    closeMobileSidebar
}) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Wrench, label: 'Tools Management', path: '/admin/tools' },
        { icon: AlertTriangle, label: 'Reported Tools', path: '/admin/reports' },
        { icon: FileText, label: 'Blog Posts', path: '/admin/content' },
        { icon: Palette, label: 'Branding', path: '/admin/branding' },
        { icon: Layout, label: 'Footer', path: '/admin/footer' },
        { icon: DollarSign, label: 'Monetization', path: '/admin/ads' },
        { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        { icon: Users, label: 'Users & Roles', path: '/admin/users' },
        { icon: Bot, label: 'AI Configuration', path: '/admin/ai-config' },
        { icon: Activity, label: 'System Health', path: '/admin/system-health' },
        { icon: Settings, label: 'System Settings', path: '/admin/settings' },
    ];

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 bg-[#0F172A] border-r border-slate-800 shadow-xl transition-all duration-300 ease-in-out flex flex-col",
                isCollapsed ? "w-20" : "w-72",
                isMobile && "translate-x-0 w-72"
            )}
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50 bg-[#0F172A]">
                <div className={cn("flex items-center gap-3 overflow-hidden", isCollapsed && "justify-center w-full")}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-500/20">
                        Z
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="font-bold text-xl text-white tracking-tight">
                                ZentryX
                            </span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide">ADMIN PANEL</span>
                        </div>
                    )}
                </div>
                {!isMobile && !isCollapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 space-y-1 px-3 custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={isMobile ? closeMobileSidebar : undefined}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                            isActive
                                ? "bg-[#3A7AFE] text-white shadow-lg shadow-blue-500/25"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-white",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                        <item.icon size={22} className={cn("shrink-0 transition-transform duration-200 group-hover:scale-110", isCollapsed && "mr-0")} />
                        {!isCollapsed && (
                            <span className="font-medium tracking-wide text-sm">{item.label}</span>
                        )}

                        {/* Tooltip for collapsed mode */}
                        {isCollapsed && (
                            <div className="absolute left-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#0F172A]">
                <div className={cn("flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer", isCollapsed && "justify-center")}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                        AD
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400 truncate">super_admin@zentryx.in</p>
                        </div>
                    )}
                    {!isCollapsed && (
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                            <LogOut size={18} />
                        </Button>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
