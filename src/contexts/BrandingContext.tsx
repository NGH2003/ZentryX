import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandingSettings {
    siteName: string;
    tagline: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    logoWidth: number;
    showSiteName: boolean;
    siteIcon: string;
    footerLogo: string;
    footerLogoWidth: number;
    footerText: string;
    footerBgColor1: string;
    footerBgColor2: string;
    footerLinks: {
        column1Title: string;
        column1Links: { label: string; url: string }[];
        column2Title: string;
        column2Links: { label: string; url: string }[];
        column3Title: string;
        column3Links: { label: string; url: string }[];
    };
}

interface BrandingContextType {
    branding: BrandingSettings;
    updateBranding: (key: keyof BrandingSettings, value: any) => void;
    setBranding: (settings: BrandingSettings) => void;
}

export const defaultBranding: BrandingSettings = {
    siteName: "ZENTRYX",
    tagline: "Smart Tools. Zero Effort.",
    logo: "",
    favicon: "",
    primaryColor: "#3A7AFE",
    secondaryColor: "#9333EA",
    logoWidth: 140,
    showSiteName: true,
    siteIcon: "",
    footerLogo: "",
    footerLogoWidth: 140,
    footerText: "40+ Free Online Tools. Fast. Simple. Trusted. Everything you need for development, design, and productivity.",
    footerBgColor1: "#0F172A", // Zentryx dark
    footerBgColor2: "#1E293B", // Slightly lighter
    footerLinks: {
        column1Title: "Tools",
        column1Links: [
            { label: "Text Tools", url: "/tools?category=text" },
            { label: "Image Tools", url: "/tools?category=image" },
            { label: "Calculators", url: "/tools?category=calculator" },
            { label: "Converters", url: "/tools?category=converter" },
            { label: "Security Tools", url: "/tools?category=security" },
            { label: "Developer Tools", url: "/tools?category=developer" },
        ],
        column2Title: "Company",
        column2Links: [
            { label: "About", url: "/about" },
            { label: "Contact", url: "/contact" },
            { label: "Privacy Policy", url: "/privacy" },
            { label: "Terms of Service", url: "/terms" },
        ],
        column3Title: "Support",
        column3Links: [
            { label: "Help Center", url: "/help-center" },
            { label: "Bug Report", url: "/bug-report" },
            { label: "Feature Request", url: "/feature-request" },
            { label: "Sitemap", url: "/sitemap" },
        ],
    },
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branding, setBrandingState] = useState<BrandingSettings>(defaultBranding);

    // Load branding from localStorage on mount
    useEffect(() => {
        const savedBranding = localStorage.getItem("websiteBranding");
        if (savedBranding) {
            try {
                const parsed = JSON.parse(savedBranding);
                // Ensure new properties are present if loading from old state
                setBrandingState({ ...defaultBranding, ...parsed });
            } catch (error) {
                console.error("Failed to parse branding settings:", error);
            }
        }
    }, []);

    // Save branding to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("websiteBranding", JSON.stringify(branding));
    }, [branding]);

    const updateBranding = (key: keyof BrandingSettings, value: any) => {
        setBrandingState(prev => ({ ...prev, [key]: value }));
    };

    const setBranding = (settings: BrandingSettings) => {
        setBrandingState(settings);
    };

    return (
        <BrandingContext.Provider value={{ branding, updateBranding, setBranding }}>
            {children}
        </BrandingContext.Provider>
    );
};

export const useBranding = () => {
    const context = useContext(BrandingContext);
    if (context === undefined) {
        throw new Error('useBranding must be used within a BrandingProvider');
    }
    return context;
};
