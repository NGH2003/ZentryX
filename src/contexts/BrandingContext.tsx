import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BrandingSettings {
    siteName: string;
    tagline: string;
    siteDescription: string;
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
        column1Links: { id: string; label: string; url: string }[];
        column2Title: string;
        column2Links: { id: string; label: string; url: string }[];
        column3Title: string;
        column3Links: { id: string; label: string; url: string }[];
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
    siteDescription: "Zentryx offers a suite of free, high-quality online tools for developers, designers, and everyday users. From PDF converters to image editors, get things done faster.",
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
            { id: "1", label: "Text Tools", url: "/tools?category=text" },
            { id: "2", label: "Image Tools", url: "/tools?category=image" },
            { id: "3", label: "Calculators", url: "/tools?category=calculator" },
            { id: "4", label: "Converters", url: "/tools?category=converter" },
            { id: "5", label: "Security Tools", url: "/tools?category=security" },
            { id: "6", label: "Developer Tools", url: "/tools?category=developer" },
        ],
        column2Title: "Company",
        column2Links: [
            { id: "7", label: "About", url: "/about" },
            { id: "8", label: "Contact", url: "/contact" },
            { id: "9", label: "Privacy Policy", url: "/privacy" },
            { id: "10", label: "Terms of Service", url: "/terms" },
        ],
        column3Title: "Support",
        column3Links: [
            { id: "11", label: "Help Center", url: "/help-center" },
            { id: "12", label: "Report Tool", url: "/bug-report" },
            { id: "13", label: "Feature Request", url: "/feature-request" },
            { id: "14", label: "Sitemap", url: "/sitemap" },
        ],
    },
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branding, setBrandingState] = useState<BrandingSettings>(defaultBranding);
    const [brandingId, setBrandingId] = useState<string | null>(null);

    // Load branding from Supabase or localStorage on mount
    useEffect(() => {
        const loadBranding = async () => {
            try {
                // Try fetching from Supabase
                // Cast to any to bypass type check for 'branding' table which is not in generated types yet
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase as any)
                    .from('branding')
                    .select('*')
                    .limit(1)
                    .single();

                if (data) {
                    console.log("Branding data loaded from Supabase:", data);
                    setBrandingId(data.id);

                    // Map snake_case DB fields to camelCase state
                    const settings: BrandingSettings = {
                        siteName: data.site_name || defaultBranding.siteName,
                        tagline: data.tagline || defaultBranding.tagline,
                        siteDescription: data.site_description || defaultBranding.siteDescription,
                        logo: data.logo || defaultBranding.logo,
                        favicon: data.favicon || defaultBranding.favicon,
                        primaryColor: data.primary_color || defaultBranding.primaryColor,
                        secondaryColor: data.secondary_color || defaultBranding.secondaryColor,
                        logoWidth: data.logo_width || defaultBranding.logoWidth,
                        showSiteName: data.show_site_name ?? defaultBranding.showSiteName,
                        siteIcon: data.site_icon || defaultBranding.siteIcon,
                        footerLogo: data.footer_logo || defaultBranding.footerLogo,
                        footerLogoWidth: data.footer_logo_width || defaultBranding.footerLogoWidth,
                        footerText: data.footer_text || defaultBranding.footerText,
                        footerBgColor1: data.footer_bg_color1 || defaultBranding.footerBgColor1,
                        footerBgColor2: data.footer_bg_color2 || defaultBranding.footerBgColor2,
                        footerLinks: data.footer_links || defaultBranding.footerLinks,
                    };

                    setBrandingState(settings);
                    return;
                } else if (error && error.code !== 'PGRST116') {
                    console.error("Supabase branding fetch error:", error);
                } else {
                    console.warn("No branding data found in Supabase (table might be empty). Falling back to local storage/defaults.");
                }
            } catch (err) {
                console.error("Failed to load from Supabase:", err);
            }

            // Fallback to localStorage
            const savedBranding = localStorage.getItem("websiteBranding");
            if (savedBranding) {
                try {
                    const parsed = JSON.parse(savedBranding);
                    setBrandingState({ ...defaultBranding, ...parsed });
                } catch (error) {
                    console.error("Failed to parse branding settings:", error);
                }
            }
        };

        loadBranding();

        // Subscribe to real-time updates
        const channel = supabase
            .channel('branding-updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'branding'
                },
                (payload) => {
                    console.log('Branding updated in realtime:', payload);
                    loadBranding();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Save branding to localStorage as backup
    useEffect(() => {
        try {
            localStorage.setItem("websiteBranding", JSON.stringify(branding));
        } catch (error) {
            console.error("Failed to save branding to localStorage:", error);
            // Check if quota exceeded
            if (error instanceof DOMException && (
                error.name === 'QuotaExceededError' ||
                error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                toast.error("Storage Limit Exceeded", {
                    description: "Your images are too large to save locally. Please use smaller images or connect to the backend."
                });
            }
        }
    }, [branding]);

    const updateBranding = async (key: keyof BrandingSettings, value: any) => {
        setBrandingState(prev => {
            const newBranding = { ...prev, [key]: value };

            // Persist to Supabase
            const saveToSupabase = async () => {
                try {
                    // Map camelCase key to snake_case for DB
                    const dbKeyMap: Record<string, string> = {
                        siteName: 'site_name',
                        tagline: 'tagline',
                        siteDescription: 'site_description',
                        logo: 'logo',
                        favicon: 'favicon',
                        primaryColor: 'primary_color',
                        secondaryColor: 'secondary_color',
                        logoWidth: 'logo_width',
                        showSiteName: 'show_site_name',
                        siteIcon: 'site_icon',
                        footerLogo: 'footer_logo',
                        footerLogoWidth: 'footer_logo_width',
                        footerText: 'footer_text',
                        footerBgColor1: 'footer_bg_color1',
                        footerBgColor2: 'footer_bg_color2',
                        footerLinks: 'footer_links'
                    };

                    const dbKey = dbKeyMap[key] || key;

                    if (brandingId) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await (supabase as any)
                            .from('branding')
                            .update({ [dbKey]: value, updated_at: new Date().toISOString() })
                            .eq('id', brandingId);
                    } else {
                        // Create new row if not exists - need to map all fields
                        const dbData = {
                            site_name: newBranding.siteName,
                            tagline: newBranding.tagline,
                            site_description: newBranding.siteDescription,
                            logo: newBranding.logo,
                            favicon: newBranding.favicon,
                            primary_color: newBranding.primaryColor,
                            secondary_color: newBranding.secondaryColor,
                            logo_width: newBranding.logoWidth,
                            show_site_name: newBranding.showSiteName,
                            site_icon: newBranding.siteIcon,
                            footer_logo: newBranding.footerLogo,
                            footer_logo_width: newBranding.footerLogoWidth,
                            footer_text: newBranding.footerText,
                            footer_bg_color1: newBranding.footerBgColor1,
                            footer_bg_color2: newBranding.footerBgColor2,
                            footer_links: newBranding.footerLinks,
                            updated_at: new Date().toISOString()
                        };

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const { data } = await (supabase as any)
                            .from('branding')
                            .insert([dbData])
                            .select()
                            .single();

                        if (data) setBrandingId(data.id);
                    }
                } catch (err) {
                    console.error("Failed to save branding to Supabase:", err);
                }
            };

            saveToSupabase();
            return newBranding;
        });
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
