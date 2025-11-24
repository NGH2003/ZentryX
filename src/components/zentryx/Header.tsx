import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBranding } from '@/contexts/BrandingContext';
import Button from './Button';

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const { branding } = useBranding();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Categories', href: '/categories' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-2xl font-bold text-white">Z</span>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-2xl font-bold bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] bg-clip-text text-transparent">
                                {branding.siteName}
                            </div>
                            <div className="text-xs text-gray-600 font-medium">
                                {branding.tagline}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#3A7AFE] hover:bg-blue-50 rounded-xl transition-all duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <div
                                className={cn(
                                    'absolute -inset-0.5 bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300',
                                    searchFocused && 'opacity-30'
                                )}
                            />
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search tools..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#3A7AFE] focus:bg-white transition-all duration-200"
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* CTA Button (Desktop) */}
                    <div className="hidden lg:block">
                        <Link to="/tools">
                            <Button variant="primary" size="md">
                                Explore Tools
                            </Button>
                        </Link>
                    </div>

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
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search tools..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#3A7AFE] focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Mobile Navigation */}
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
                        </nav>

                        {/* Mobile CTA */}
                        <div className="mt-4">
                            <Link to="/tools" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="primary" size="md" fullWidth>
                                    Explore Tools
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
