import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Heart, ArrowRight } from 'lucide-react';
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
        <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column (4 cols) */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
                            {branding.footerLogo || branding.logo || branding.siteIcon ? (
                                <img
                                    src={branding.footerLogo || branding.logo || branding.siteIcon}
                                    alt={branding.siteName}
                                    className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                    style={{ width: `${branding.footerLogoWidth || branding.logoWidth || 140}px` }}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A7AFE] to-[#1D4ED8] flex items-center justify-center shadow-lg">
                                    <span className="text-xl font-bold text-white">Z</span>
                                </div>
                            )}
                            {branding.showSiteName && (
                                <div>
                                    <div className="text-xl font-bold text-white tracking-tight">
                                        {branding.siteName}
                                    </div>
                                </div>
                            )}
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-sm">
                            {branding.footerText || "Empowering developers and creators with free, fast, and secure online tools. No signup required."}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#3A7AFE] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Spacer (1 col) */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Tools Column (3 cols) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                            {branding.footerLinks.column1Title}
                        </h3>
                        <ul className="space-y-3">
                            {branding.footerLinks.column1Links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.url}
                                        className="text-sm text-slate-400 hover:text-[#3A7AFE] transition-colors duration-200 flex items-center group"
                                    >
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column (2 cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                            {branding.footerLinks.column2Title}
                        </h3>
                        <ul className="space-y-3">
                            {branding.footerLinks.column2Links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.url}
                                        className="text-sm text-slate-400 hover:text-[#3A7AFE] transition-colors duration-200 block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column (2 cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                            {branding.footerLinks.column3Title}
                        </h3>
                        <ul className="space-y-3">
                            {branding.footerLinks.column3Links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.url}
                                        className="text-sm text-slate-400 hover:text-[#3A7AFE] transition-colors duration-200 block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {currentYear} {branding.siteName}. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-slate-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center">
                        Made with <Heart className="w-3 h-3 mx-1 text-red-500 fill-red-500" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
