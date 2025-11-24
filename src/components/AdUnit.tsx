import React, { useEffect } from 'react';
import { useAds } from '@/contexts/AdsContext';

interface AdUnitProps {
    slot: 'header' | 'sidebar' | 'footer' | 'toolPage';
    className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ slot, className = '' }) => {
    const { config } = useAds();

    useEffect(() => {
        console.log(`AdUnit[${slot}]: Config updated`, {
            globalEnabled: config.enabled,
            slotEnabled: config.slots[slot]?.enabled
        });
    }, [config, slot]);

    // Check if global ads are enabled
    if (!config.enabled) {
        console.log(`AdUnit[${slot}]: Ads globally disabled`);
        return null;
    }

    const adSlot = config.slots[slot];

    // Check if specific slot is enabled
    if (!adSlot || !adSlot.enabled) {
        console.log(`AdUnit[${slot}]: Slot disabled`);
        return null;
    }

    return (
        <div
            key={`${slot}-${config.enabled}-${adSlot.enabled}`}
            className={`ad-unit ad-${slot} flex justify-center items-center my-4 ${className}`}
            dangerouslySetInnerHTML={{ __html: adSlot.code }}
        />
    );
};
