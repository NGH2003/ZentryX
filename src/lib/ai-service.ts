
export interface AIProviderConfig {
    id: string;
    name: string;
    apiKey: string;
    models: string[];
    status: 'active' | 'inactive';
}

const DEFAULT_MODELS: Record<string, string[]> = {
    openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    groq: ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it'],
    gemini: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'],
    replicate: ['stable-diffusion-3', 'llama-2-70b', 'stable-diffusion']
};

export const getActiveProviderModels = (): string[] => {
    const savedConfig = localStorage.getItem('aiConfiguration');
    if (!savedConfig) return [];

    try {
        const config = JSON.parse(savedConfig);
        const activeProvider = config.providers.find((p: AIProviderConfig) => p.status === 'active');

        if (!activeProvider) return [];

        // Return the latest default models for the provider type to ensure frontend is up to date
        // regardless of what's cached in localStorage
        return DEFAULT_MODELS[activeProvider.id] || activeProvider.models || [];
    } catch (e) {
        console.error("Error parsing AI config:", e);
        return [];
    }
};

export const generateAIContent = async (prompt: string, systemPrompt: string = "You are a helpful AI assistant.", selectedModel?: string): Promise<string> => {
    // Get configuration
    const savedConfig = localStorage.getItem('aiConfiguration');
    if (!savedConfig) {
        throw new Error("AI Configuration not found. Please configure AI in Admin Panel.");
    }

    const config = JSON.parse(savedConfig);
    const activeProvider = config.providers.find((p: AIProviderConfig) => p.status === 'active');

    if (!activeProvider || !activeProvider.apiKey) {
        throw new Error("No active AI provider configured. Please check Admin Panel.");
    }

    // Use selected model if provided, otherwise default to first model
    const model = selectedModel || activeProvider.models[0];

    try {
        if (activeProvider.id === 'groq') {
            return await generateGroqContent(activeProvider.apiKey, model, prompt, systemPrompt);
        } else if (activeProvider.id === 'openai') {
            return await generateOpenAIContent(activeProvider.apiKey, model, prompt, systemPrompt);
        } else if (activeProvider.id === 'gemini') {
            return await generateGeminiContent(activeProvider.apiKey, model, prompt, systemPrompt);
        } else {
            throw new Error(`Provider ${activeProvider.name} not supported yet.`);
        }
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        throw new Error(error.message || "Failed to generate content");
    }
};

const generateGroqContent = async (apiKey: string, model: string, prompt: string, systemPrompt: string): Promise<string> => {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            model: model,
            temperature: 0.7,
            max_tokens: 4096,
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Groq API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
};

const generateOpenAIContent = async (apiKey: string, model: string, prompt: string, systemPrompt: string): Promise<string> => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            model: model,
            temperature: 0.7,
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `OpenAI API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
};

const generateGeminiContent = async (apiKey: string, model: string, prompt: string, systemPrompt: string): Promise<string> => {
    // Helper to perform the fetch
    const performGeminiFetch = async (modelToUse: string) => {
        // Ensure model name doesn't have 'models/' prefix for the URL construction
        // The API expects .../models/{modelId}:generateContent
        const modelId = modelToUse.replace(/^models\//, '');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemPrompt}\n\nUser Prompt: ${prompt}` }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Gemini API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    };

    try {
        return await performGeminiFetch(model);
    } catch (error: any) {
        // If the error is about the model not being found or supported, try the fallback
        if (error.message?.includes('not found') || error.message?.includes('not supported')) {
            console.warn(`Model ${model} failed, retrying with gemini-1.5-flash...`);
            return await performGeminiFetch('gemini-1.5-flash');
        }
        throw error;
    }
};
