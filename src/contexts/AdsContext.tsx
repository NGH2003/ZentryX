import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface AdSlot {
    enabled: boolean;
    code: string;
}

export interface AdsConfig {
    enabled: boolean;
    provider: "google" | "custom";
    googleAdSenseId: string;
    slots: {
        header: AdSlot;
        sidebar: AdSlot;
        footer: AdSlot;
        toolPage: AdSlot;
    };
}

interface AdsContextType {
    config: AdsConfig;
    updateConfig: (config: AdsConfig) => void;
    updateSlot: (slotName: keyof AdsConfig['slots'], slotData: Partial<AdSlot>) => void;
}

const defaultAdsConfig: AdsConfig = {
    enabled: true,
    provider: "custom",
    googleAdSenseId: "",
    slots: {
        header: {
            enabled: true,
            code: `<div style="width: 100%; height: 90px; background: linear-gradient(90deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px dashed #bae6fd; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0284c7; font-weight: 600;">Header Ad Space (728x90)</div>`
        },
        sidebar: {
            enabled: true,
            code: `<div style="width: 100%; height: 250px; background: linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%); border: 2px dashed #86efac; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #15803d; font-weight: 600;">Sidebar Ad (300x250)</div>`
        },
        footer: {
            enabled: false,
            code: `<div style="width: 100%; height: 90px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b;">Footer Ad Space</div>`
        },
        toolPage: {
            enabled: true,
            code: `<div style="width: 100%; padding: 20px; background: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; text-align: center; color: #c2410c;">
        <h4 style="margin: 0 0 8px 0;">Tool Sponsor</h4>
        <p style="margin: 0; font-size: 14px;">This tool is free to use!</p>
      </div>`
        },
    }
};

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export const useAds = () => {
    const context = useContext(AdsContext);
    if (!context) {
        throw new Error('useAds must be used within an AdsProvider');
    }
    return context;
};

export const AdsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<AdsConfig>(defaultAdsConfig);
    const [configId, setConfigId] = useState<string | null>(null);

    // Load from Supabase
    useEffect(() => {
        const loadConfig = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase as any)
                    .from('ads_config')
                    .select('*')
                    .limit(1)
                    .single();

                if (data) {
                    setConfigId(data.id);
                    setConfig({
                        enabled: data.enabled,
                        provider: data.provider as "google" | "custom",
                        googleAdSenseId: data.google_adsense_id || "",
                        slots: data.slots || defaultAdsConfig.slots
                    });
                } else if (error && error.code !== 'PGRST116') {
                    console.error("Supabase ads fetch error:", error);
                    // Fallback
                    const saved = localStorage.getItem('adsConfig');
                    if (saved) setConfig(JSON.parse(saved));
                }
            } catch (err) {
                console.error("Failed to load ads config:", err);
                const saved = localStorage.getItem('adsConfig');
                if (saved) setConfig(JSON.parse(saved));
            }
        };
        loadConfig();
    }, []);

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem('adsConfig', JSON.stringify(config));
    }, [config]);

    const updateConfig = async (newConfig: AdsConfig) => {
        setConfig(newConfig);

        try {
            const dbData = {
                enabled: newConfig.enabled,
                provider: newConfig.provider,
                google_adsense_id: newConfig.googleAdSenseId,
                slots: newConfig.slots,
                updated_at: new Date().toISOString()
            };

            if (configId) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (supabase as any)
                    .from('ads_config')
                    .update(dbData)
                    .eq('id', configId);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data } = await (supabase as any)
                    .from('ads_config')
                    .insert([dbData])
                    .select()
                    .single();
                if (data) setConfigId(data.id);
            }
        } catch (err) {
            console.error("Failed to save ads config to Supabase:", err);
        }
    };

    const updateSlot = (slotName: keyof AdsConfig['slots'], slotData: Partial<AdSlot>) => {
        const newConfig = {
            ...config,
            slots: {
                ...config.slots,
                [slotName]: { ...config.slots[slotName], ...slotData }
            }
        };
        updateConfig(newConfig);
    };

    return (
        <AdsContext.Provider value={{ config, updateConfig, updateSlot }}>
            {children}
        </AdsContext.Provider>
    );
};
