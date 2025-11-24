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
    siteName: "ToolBox Zenith",
    tagline: "Your Ultimate Collection of Web Tools",
    logo: "",
    favicon: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    logoWidth: 120,
    showSiteName: true,
    siteIcon: "",
    footerLogo: "",
    footerLogoWidth: 120,
    footerText: "The ultimate collection of digital tools for developers, designers, and creators.",
    footerBgColor1: "#111827", // gray-900
    footerBgColor2: "#111827", // gray-900
    footerLinks: {
        column1Title: "Tools",
        column1Links: [
            { label: "Converters", url: "/categories" },
            { label: "Calculators", url: "/categories" },
            { label: "Generators", url: "/categories" },
            { label: "Text Tools", url: "/categories" },
        ],
        column2Title: "Company",
        column2Links: [
            { label: "About", url: "/about" },
            { label: "Blog", url: "/blog" },
            { label: "Privacy", url: "/privacy" },
            { label: "Terms", url: "/terms" },
        ],
        column3Title: "Support",
        column3Links: [
            { label: "Help Center", url: "/help-center" },
            { label: "Bug Report", url: "/bug-report" },
            { label: "Feature Request", url: "/feature-request" },
            { label: "Contact", url: "/contact" },
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
