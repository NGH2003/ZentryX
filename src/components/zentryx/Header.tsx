import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { useBranding } from '@/contexts/BrandingContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { branding } = useBranding();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'All Tools', href: '/tools' },
        { name: 'Blog', href: '/blog' },
        { name: 'Report Tools', href: '/bug-report' },
    ];

    const moreLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Help Center', href: '/help-center' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group z-50 relative">
                        {branding.logo || branding.siteIcon ? (
                            <img
                                src={branding.logo || branding.siteIcon}
                                alt={branding.siteName}
                                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                                style={{ width: `${branding.logoWidth || 140}px` }}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span className="text-xl font-bold text-white">Z</span>
                            </div>
                        )}
                        {branding.showSiteName && (
                            <div className="hidden sm:block">
                                <div className="text-xl font-bold bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] bg-clip-text text-transparent">
                                    {branding.siteName}
                                </div>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 ml-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${location.pathname === item.href
                                        ? 'text-[#3A7AFE] bg-blue-50'
                                        : 'text-slate-600 hover:text-[#3A7AFE] hover:bg-slate-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* More Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#3A7AFE] hover:bg-slate-50 rounded-full transition-all duration-200 outline-none">
                                More <ChevronDown className="ml-1 h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-lg border-slate-200 shadow-xl rounded-xl p-1">
                                {moreLinks.map((link) => (
                                    <DropdownMenuItem key={link.name} asChild className="rounded-lg">
                                        <Link
                                            to={link.href}
                                            className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#3A7AFE] hover:bg-blue-50 focus:bg-blue-50 focus:text-[#3A7AFE]"
                                        >
                                            {link.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Search Button (Desktop) */}
                        <Link to="/tools">
                            <Button variant="ghost" size="icon" className="ml-2 text-slate-600 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-full">
                                <Search className="w-5 h-5" />
                            </Button>
                        </Link>

                        {/* CTA Button */}
                        <Link to="/tools" className="ml-4">
                            <Button className="bg-[#3A7AFE] hover:bg-[#1D4ED8] text-white rounded-full px-6 shadow-lg hover:shadow-blue-500/25 transition-all">
                                Get Started
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-50 relative"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl animate-fade-in lg:hidden flex flex-col pt-24 px-6">
                    <nav className="space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`block px-6 py-4 text-lg font-semibold rounded-2xl transition-all ${location.pathname === item.href
                                        ? 'text-[#3A7AFE] bg-blue-50'
                                        : 'text-slate-800 hover:bg-slate-50'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="pt-4 border-t border-slate-100">
                            <div className="px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                More Links
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {moreLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-[#3A7AFE] hover:bg-slate-50 rounded-xl transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link to="/tools" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-[#3A7AFE] hover:bg-[#1D4ED8] text-white py-6 text-lg rounded-xl shadow-lg">
                                    Explore Tools
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
