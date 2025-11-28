import React from 'react';
import { Bell, Search, Menu, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopHeaderProps {
    toggleSidebar: () => void;
    isCollapsed: boolean;
}

const TopHeader: React.FC<TopHeaderProps> = ({ toggleSidebar, isCollapsed }) => {
    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8 transition-all duration-300 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 lg:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* Global Search */}
                <div className="hidden md:flex items-center relative group">
                    <Search className="absolute left-4 text-slate-400 group-focus-within:text-[#3A7AFE] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search tools, users, settings..."
                        className="pl-12 pr-4 py-2.5 w-64 lg:w-96 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3A7AFE] focus:bg-white transition-all shadow-sm"
                    />
                    <div className="absolute right-3 flex gap-1 pointer-events-none">
                        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-slate-200 bg-white px-2 font-mono text-[10px] font-medium text-slate-500 shadow-sm">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative rounded-full text-slate-500 hover:text-[#3A7AFE] hover:bg-blue-50 transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-slate-200 transition-all outline-none">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] p-[2px] shadow-md">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                                        alt="Admin"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-sm font-semibold text-slate-700 leading-none">Admin User</span>
                                <span className="text-xs text-slate-400 font-medium mt-0.5">Super Admin</span>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-slate-100 p-2">
                        <DropdownMenuLabel className="font-semibold text-slate-900 px-2 py-1.5">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-100" />
                        <DropdownMenuItem className="rounded-lg cursor-pointer text-slate-600 focus:text-[#3A7AFE] focus:bg-blue-50 px-2 py-2">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer text-slate-600 focus:text-[#3A7AFE] focus:bg-blue-50 px-2 py-2">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100" />
                        <DropdownMenuItem className="rounded-lg cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50 px-2 py-2">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default TopHeader;
