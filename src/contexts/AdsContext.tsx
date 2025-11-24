import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    const [config, setConfig] = useState<AdsConfig>(() => {
        const saved = localStorage.getItem('adsConfig');
        return saved ? JSON.parse(saved) : defaultAdsConfig;
    });

    useEffect(() => {
        localStorage.setItem('adsConfig', JSON.stringify(config));
    }, [config]);

    const updateConfig = (newConfig: AdsConfig) => {
        console.log('AdsContext: Updating config', newConfig);
        setConfig(newConfig);
        localStorage.setItem('adsConfig', JSON.stringify(newConfig));
    };

    const updateSlot = (slotName: keyof AdsConfig['slots'], slotData: Partial<AdSlot>) => {
        setConfig(prev => ({
            ...prev,
            slots: {
                ...prev.slots,
                [slotName]: { ...prev.slots[slotName], ...slotData }
            }
        }));
    };

    return (
        <AdsContext.Provider value={{ config, updateConfig, updateSlot }}>
            {children}
        </AdsContext.Provider>
    );
};
