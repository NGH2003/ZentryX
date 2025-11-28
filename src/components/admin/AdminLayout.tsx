import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

const AdminLayout: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setIsSidebarCollapsed(true); // Default to collapsed logic on mobile (hidden)
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
            {/* Mobile Overlay */}
            {isMobile && isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isMobile && !isMobileSidebarOpen ? "-translate-x-full" : "translate-x-0"
                )}
            >
                <Sidebar
                    isCollapsed={isSidebarCollapsed && !isMobile}
                    toggleCollapse={toggleCollapse}
                    isMobile={isMobile}
                    closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
                />
            </div>

            {/* Main Content */}
            <div
                className={cn(
                    "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
                    !isMobile && (isSidebarCollapsed ? "ml-20" : "ml-64"),
                    isMobile && "ml-0"
                )}
            >
                <TopHeader
                    toggleSidebar={toggleMobileSidebar}
                    isCollapsed={isSidebarCollapsed}
                />

                <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
