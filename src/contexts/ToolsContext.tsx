import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { tools as localTools } from "@/data/tools";

export interface Tool {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    path?: string;
    featured: boolean;
    status?: string;
    uses: number;
    tags: string[];
    created_at?: string;
    updated_at?: string;
}

interface ToolsContextType {
    tools: Tool[];
    loading: boolean;
    refreshTools: () => Promise<void>;
    getToolById: (id: number) => Tool | undefined;
    getToolBySlug: (categorySlug: string, toolSlug: string) => Tool | undefined;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const useTools = () => {
    const context = useContext(ToolsContext);
    if (!context) {
        throw new Error('useTools must be used within a ToolsProvider');
    }
    return context;
};

// Helper to slugify text
const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const ToolsProvider = ({ children }: { children: ReactNode }) => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshTools = async () => {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from('tools')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                const mergedTools = data.map((dbTool: any) => {
                    const localTool = localTools.find(lt => lt.id === dbTool.id);
                    return {
                        ...dbTool,
                        tags: localTool?.tags || [],
                        uses: localTool?.uses || 0,
                    };
                });
                setTools(mergedTools);
            } else {
                console.warn("No tools found in Supabase, using local fallback.");
                // Cast localTools to Tool[] and add missing optional properties if needed
                const fallbackTools = localTools.map(t => ({
                    ...t,
                    path: undefined,
                    status: 'active'
                })) as Tool[];
                setTools(fallbackTools);
            }
        } catch (error) {
            console.error("Failed to fetch tools:", error);
            const fallbackTools = localTools.map(t => ({
                ...t,
                path: undefined,
                status: 'active'
            })) as Tool[];
            setTools(fallbackTools);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshTools();
    }, []);

    const getToolById = (id: number) => tools.find(t => t.id === id);

    const getToolBySlug = (categorySlug: string, toolSlug: string) => {
        return tools.find(t =>
            slugify(t.category) === categorySlug &&
            slugify(t.name) === toolSlug
        );
    };

    return (
        <ToolsContext.Provider value={{ tools, loading, refreshTools, getToolById, getToolBySlug }}>
            {children}
        </ToolsContext.Provider>
    );
};
