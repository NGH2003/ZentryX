import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useBranding } from '@/contexts/BrandingContext';
import Button from './Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { branding } = useBranding();

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
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        {branding.logo || branding.siteIcon ? (
                            <img
                                src={branding.logo || branding.siteIcon}
                                alt={branding.siteName}
                                className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                                style={{ width: `${branding.logoWidth || 140}px` }}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span className="text-2xl font-bold text-white">Z</span>
                            </div>
                        )}
                        {branding.showSiteName && (
                            <div className="hidden sm:block">
                                <div className="text-2xl font-bold bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] bg-clip-text text-transparent">
                                    {branding.siteName}
                                </div>
                                <div className="text-xs text-gray-600 font-medium">
                                    {branding.tagline}
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
                                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-xl transition-all duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* More Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-xl transition-all duration-200 outline-none">
                                More <ChevronDown className="ml-1 h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-lg border-gray-200 shadow-xl rounded-xl">
                                {moreLinks.map((link) => (
                                    <DropdownMenuItem key={link.name} asChild>
                                        <Link
                                            to={link.href}
                                            className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#3A7AFE] hover:bg-blue-50 focus:bg-blue-50 focus:text-[#3A7AFE]"
                                        >
                                            {link.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in">
                        <nav className="space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-xl transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                More
                            </div>
                            {moreLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-xl transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
