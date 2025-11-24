import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBranding } from '@/contexts/BrandingContext';

const Footer: React.FC = () => {
    const { branding } = useBranding();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', icon: Github, href: '#' },
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' },
        { name: 'Email', icon: Mail, href: 'mailto:hello@zentryx.in' },
    ];

    return (
        <footer className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span className="text-2xl font-bold text-white">Z</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">
                                    {branding.siteName}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {branding.tagline}
                                </div>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            {branding.footerText}
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tools Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">
                            {branding.footerLinks.column1Title}
                        </h3>
                        <ul className="space-y-3">
                            {branding.footerLinks.column1Links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.url}
                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#3A7AFE] transition-all duration-200 mr-0 group-hover:mr-2" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">
                            {branding.footerLinks.column2Title}
                        </h3>
                        <ul className="space-y-3">
                            {branding.footerLinks.column2Links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.url}
                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#3A7AFE] transition-all duration-200 mr-0 group-hover:mr-2" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">
                            {branding.footerLinks.column3Title}
                        </h3>
                        <ul className="space-y-3">
                            {branding.footerLinks.column3Links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.url}
                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#3A7AFE] transition-all duration-200 mr-0 group-hover:mr-2" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {currentYear} {branding.siteName}. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400 flex items-center">
                            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" /> for developers and creators
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
