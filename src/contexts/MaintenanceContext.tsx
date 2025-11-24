import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MaintenanceContextProps {
    isMaintenanceMode: boolean;
    setMaintenanceMode: (enabled: boolean) => void;
    maintenanceMessage: string;
    updateMaintenanceMessage: (message: string) => void;
}

const MaintenanceContext = createContext<MaintenanceContextProps | undefined>(undefined);

export const MaintenanceProvider = ({ children }: { children: ReactNode }) => {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(() => {
        // Initialize from localStorage immediately
        const stored = localStorage.getItem('maintenanceMode');
        console.log('MaintenanceContext: Initial load from localStorage:', stored);
        return stored === 'true';
    });

    const [maintenanceMessage, setMaintenanceMessage] = useState<string>(() => {
        return localStorage.getItem('maintenanceMessage') || "We're currently performing scheduled maintenance. We'll be back shortly.";
    });

    // Load maintenance mode state from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('maintenanceMode');
        const storedMsg = localStorage.getItem('maintenanceMessage');
        console.log('MaintenanceContext: useEffect loading from localStorage:', stored);
        if (stored === 'true') {
            setIsMaintenanceMode(true);
        } else {
            setIsMaintenanceMode(false);
        }
        if (storedMsg) {
            setMaintenanceMessage(storedMsg);
        }
    }, []);

    // Listen for storage changes (for cross-tab synchronization)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'maintenanceMode') {
                console.log('MaintenanceContext: Storage event detected, new value:', e.newValue);
                setIsMaintenanceMode(e.newValue === 'true');
            }
            if (e.key === 'maintenanceMessage' && e.newValue) {
                setMaintenanceMessage(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const setMaintenanceMode = (enabled: boolean) => {
        console.log('MaintenanceContext: Setting maintenance mode to:', enabled);
        setIsMaintenanceMode(enabled);
        localStorage.setItem('maintenanceMode', enabled.toString());
        console.log('MaintenanceContext: Saved to localStorage:', localStorage.getItem('maintenanceMode'));
    };

    const updateMaintenanceMessage = (message: string) => {
        setMaintenanceMessage(message);
        localStorage.setItem('maintenanceMessage', message);
    };

    return (
        <MaintenanceContext.Provider value={{ isMaintenanceMode, setMaintenanceMode, maintenanceMessage, updateMaintenanceMessage }}>
            {children}
        </MaintenanceContext.Provider>
    );
};

export const useMaintenance = (): MaintenanceContextProps => {
    const context = useContext(MaintenanceContext);
    if (!context) {
        throw new Error('useMaintenance must be used within a MaintenanceProvider');
    }
    return context;
};
