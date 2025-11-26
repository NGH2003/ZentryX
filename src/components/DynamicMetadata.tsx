import { useEffect } from 'react';
import { useBranding } from '@/contexts/BrandingContext';
import { useLocation } from 'react-router-dom';

export const DynamicMetadata = () => {
    const { branding } = useBranding();
    const location = useLocation();

    useEffect(() => {
        // Update document title based on current page
        const getPageTitle = () => {
            const path = location.pathname;
            const siteName = branding.siteName || 'ZENTRYX';

            if (path === '/') return siteName;
            if (path === '/tools') return `Tools - ${siteName}`;
            if (path === '/categories') return `Categories - ${siteName}`;
            if (path === '/about') return `About - ${siteName}`;
            if (path === '/contact') return `Contact - ${siteName}`;
            if (path === '/backend') return `Admin Panel - ${siteName}`;
            if (path === '/login') return `Login - ${siteName}`;
            if (path === '/profile') return `Profile - ${siteName}`;

            return siteName;
        };

        document.title = getPageTitle();
    }, [location.pathname, branding.siteName]);

    useEffect(() => {
        // Update favicon if provided
        const iconUrl = branding.siteIcon || branding.favicon;
        if (iconUrl) {
            let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }

            link.href = iconUrl;
        }
    }, [branding.siteIcon, branding.favicon]);

    useEffect(() => {
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.getElementsByTagName('head')[0].appendChild(metaDescription);
        }

        const description = branding.tagline || 'Your Ultimate Collection of Web Tools';
        metaDescription.setAttribute('content', description);
    }, [branding.tagline]);

    useEffect(() => {
        // Update theme color based on primary color
        if (branding.primaryColor) {
            let metaTheme = document.querySelector('meta[name="theme-color"]');

            if (!metaTheme) {
                metaTheme = document.createElement('meta');
                metaTheme.setAttribute('name', 'theme-color');
                document.getElementsByTagName('head')[0].appendChild(metaTheme);
            }

            metaTheme.setAttribute('content', branding.primaryColor);
        }
    }, [branding.primaryColor]);

    // This component doesn't render anything
    return null;
};
