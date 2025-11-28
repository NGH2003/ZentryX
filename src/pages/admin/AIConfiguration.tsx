import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Settings,
    Key,
    BarChart3,
    Zap,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    Save,
    RefreshCw,
    TrendingUp,
    Activity,
    Bot,
    Cpu,
    Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AIProvider {
    id: string;
    name: string;
    icon: string;
    models: string[];
    status: 'active' | 'inactive';
    apiKey?: string;
    usage: {
        requests: number;
        tokens: number;
        cost: number;
    };
    limits: {
        requestsPerDay: number;
        tokensPerRequest: number;
    };
}

export const AIConfiguration = () => {
    const [providers, setProviders] = useState<AIProvider[]>([
        {
            id: 'gemini',
            name: 'Google Gemini',
            icon: '🤖',
            models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'],
            status: 'inactive',
            apiKey: '',
            usage: { requests: 0, tokens: 0, cost: 0 },
            limits: { requestsPerDay: 1000, tokensPerRequest: 2048 }
        },
        {
            id: 'openai',
            name: 'OpenAI',
            icon: '🧠',
            models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
            status: 'inactive',
            apiKey: '',
            usage: { requests: 0, tokens: 0, cost: 0 },
            limits: { requestsPerDay: 500, tokensPerRequest: 4096 }
        },
        {
            id: 'groq',
            name: 'Groq',
            icon: '⚡',
            models: ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it'],
            status: 'inactive',
            apiKey: '',
            usage: { requests: 0, tokens: 0, cost: 0 },
            limits: { requestsPerDay: 1000, tokensPerRequest: 8192 }
        },
        {
            id: 'replicate',
            name: 'Replicate',
            icon: '🔄',
            models: ['stable-diffusion-3', 'llama-2-70b', 'stable-diffusion'],
            status: 'inactive',
            apiKey: '',
            usage: { requests: 0, tokens: 0, cost: 0 },
            limits: { requestsPerDay: 200, tokensPerRequest: 1024 }
        }
    ]);

    const [selectedProvider, setSelectedProvider] = useState<string>('gemini');
    const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [configId, setConfigId] = useState<string | null>(null);
    const [usageStats, setUsageStats] = useState({
        totalRequests: 0,
        totalTokens: 0,
        totalCost: 0,
        activeProviders: 0
    });

    useEffect(() => {
        const loadConfig = async () => {
            try {
                // Try fetching from Supabase
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data, error } = await (supabase as any)
                    .from('ai_config')
                    .select('*')
                    .limit(1)
                    .single();

                let loadedProviders: AIProvider[] | null = null;

                if (data) {
                    setConfigId(data.id);
                    if (data.providers && Array.isArray(data.providers)) {
                        loadedProviders = data.providers;
                    }
                } else if (error && error.code !== 'PGRST116') {
                    console.error("Supabase AI config fetch error:", error);
                }

                // Fallback to localStorage if Supabase failed or returned no providers
                if (!loadedProviders) {
                    const savedConfig = localStorage.getItem('aiConfiguration');
                    if (savedConfig) {
                        try {
                            const config = JSON.parse(savedConfig);
                            if (config.providers) loadedProviders = config.providers;
                        } catch (e) {
                            console.error("Error parsing localStorage config", e);
                        }
                    }
                }

                if (loadedProviders) {
                    // Merge logic
                    const mergedProviders = providers.map(defaultProvider => {
                        const savedProvider = loadedProviders!.find((p: AIProvider) => p.id === defaultProvider.id);
                        if (savedProvider) {
                            return {
                                ...defaultProvider,
                                apiKey: savedProvider.apiKey,
                                status: savedProvider.status,
                                limits: savedProvider.limits,
                                usage: savedProvider.usage,
                                models: defaultProvider.models // Keep default models updated
                            };
                        }
                        return defaultProvider;
                    });
                    setProviders(mergedProviders);
                }

            } catch (err) {
                console.error("Failed to load AI config:", err);
            }
        };

        loadConfig();
    }, []);

    useEffect(() => {
        calculateUsageStats();
    }, [providers]);

    const calculateUsageStats = () => {
        const stats = providers.reduce((acc, provider) => {
            return {
                totalRequests: acc.totalRequests + provider.usage.requests,
                totalTokens: acc.totalTokens + provider.usage.tokens,
                totalCost: acc.totalCost + provider.usage.cost,
                activeProviders: acc.activeProviders + (provider.status === 'active' ? 1 : 0)
            };
        }, { totalRequests: 0, totalTokens: 0, totalCost: 0, activeProviders: 0 });

        setUsageStats(stats);
    };

    const handleSaveProvider = async (providerId: string) => {
        setIsLoading(true);

        try {
            // Save to localStorage
            const config = { providers };
            localStorage.setItem('aiConfiguration', JSON.stringify(config));

            // Save to Supabase
            const dbData = {
                providers: providers,
                updated_at: new Date().toISOString()
            };

            if (configId) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (supabase as any)
                    .from('ai_config')
                    .update(dbData)
                    .eq('id', configId);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data } = await (supabase as any)
                    .from('ai_config')
                    .insert([dbData])
                    .select()
                    .single();
                if (data) setConfigId(data.id);
            }

            toast.success('Configuration saved successfully!');
        } catch (error) {
            toast.error('Failed to save configuration');
            console.error('Save error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTestConnection = async (providerId: string) => {
        const provider = providers.find(p => p.id === providerId);
        if (!provider?.apiKey) {
            toast.error('Please enter an API key first');
            return;
        }

        setIsLoading(true);
        toast.info('Testing connection...');

        try {
            // Simulate API test (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Update provider status
            setProviders(prev => prev.map(p =>
                p.id === providerId
                    ? { ...p, status: 'active' as const }
                    : p
            ));

            toast.success(`${provider.name} connected successfully!`);
        } catch (error) {
            toast.error('Connection test failed');
            console.error('Test error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProvider = (providerId: string, field: string, value: any) => {
        setProviders(prev => prev.map(p =>
            p.id === providerId
                ? { ...p, [field]: value }
                : p
        ));
    };

    const handleUpdateLimits = (providerId: string, field: string, value: number) => {
        setProviders(prev => prev.map(p =>
            p.id === providerId
                ? { ...p, limits: { ...p.limits, [field]: value } }
                : p
        ));
    };

    const toggleApiKeyVisibility = (providerId: string) => {
        setShowApiKey(prev => ({ ...prev, [providerId]: !prev[providerId] }));
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Configuration</h1>
                    <p className="text-slate-500 mt-1">Manage AI providers, API keys, and usage limits</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white border-slate-200 shadow-sm rounded-xl text-slate-700 hover:bg-slate-50">
                        <RefreshCw size={16} /> Sync Usage
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Requests</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{usageStats.totalRequests.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <Activity className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Tokens</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{usageStats.totalTokens.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                                <Zap className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Cost</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">${usageStats.totalCost.toFixed(2)}</p>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Active Providers</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{usageStats.activeProviders}/{providers.length}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                                <Bot className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Configuration */}
            <Tabs value={selectedProvider} onValueChange={setSelectedProvider} className="space-y-6">
                <TabsList className="bg-white border border-slate-200 p-1.5 rounded-2xl h-auto flex-wrap justify-start shadow-sm w-full sm:w-auto inline-flex">
                    {providers.map(provider => (
                        <TabsTrigger
                            key={provider.id}
                            value={provider.id}
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                        >
                            <span className="text-lg">{provider.icon}</span>
                            <span className="font-medium">{provider.name}</span>
                            {provider.status === 'active' && (
                                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            )}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {providers.map(provider => (
                    <TabsContent key={provider.id} value={provider.id} className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: API & Settings */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* API Configuration */}
                                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            <Key className="w-5 h-5 text-[#3A7AFE]" />
                                            API Configuration
                                        </CardTitle>
                                        <CardDescription>
                                            Configure {provider.name} API settings and credentials
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        {/* API Key */}
                                        <div className="space-y-2">
                                            <Label htmlFor={`apiKey-${provider.id}`} className="text-slate-700 font-medium">API Key</Label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Input
                                                        id={`apiKey-${provider.id}`}
                                                        type={showApiKey[provider.id] ? 'text' : 'password'}
                                                        value={provider.apiKey}
                                                        onChange={(e) => handleUpdateProvider(provider.id, 'apiKey', e.target.value)}
                                                        placeholder={`Enter your ${provider.name} API key`}
                                                        className="pr-10 bg-slate-50 border-slate-200 focus:bg-white transition-all font-mono text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleApiKeyVisibility(provider.id)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                    >
                                                        {showApiKey[provider.id] ? (
                                                            <EyeOff className="w-4 h-4" />
                                                        ) : (
                                                            <Eye className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                                <Button
                                                    onClick={() => handleTestConnection(provider.id)}
                                                    disabled={!provider.apiKey || isLoading}
                                                    variant="outline"
                                                    className="border-slate-200 hover:bg-slate-50 hover:text-[#3A7AFE]"
                                                >
                                                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                                    Test
                                                </Button>
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                Get your API key from the <a href="#" className="text-[#3A7AFE] hover:underline">{provider.name} dashboard</a>
                                            </p>
                                        </div>

                                        {/* Model Selection */}
                                        <div className="space-y-2">
                                            <Label htmlFor={`model-${provider.id}`} className="text-slate-700 font-medium">Default Model</Label>
                                            <Select defaultValue={provider.models[0]}>
                                                <SelectTrigger id={`model-${provider.id}`} className="bg-slate-50 border-slate-200 focus:bg-white transition-all">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {provider.models.map(model => (
                                                        <SelectItem key={model} value={model}>
                                                            <div className="flex items-center gap-2">
                                                                <Sparkles size={14} className="text-purple-500" />
                                                                {model}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Status Toggle */}
                                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", provider.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500')}>
                                                    <Zap size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">Provider Status</p>
                                                    <p className="text-sm text-slate-500">
                                                        {provider.status === 'active' ? 'Active and ready to use' : 'Inactive'}
                                                    </p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={provider.status === 'active'}
                                                onCheckedChange={(checked) =>
                                                    handleUpdateProvider(provider.id, 'status', checked ? 'active' : 'inactive')
                                                }
                                                className="data-[state=checked]:bg-emerald-500"
                                            />
                                        </div>

                                        {/* Save Button */}
                                        <Button
                                            onClick={() => handleSaveProvider(provider.id)}
                                            disabled={isLoading}
                                            className="w-full bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 h-11 text-base"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Configuration
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Usage Limits */}
                                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            <Settings className="w-5 h-5 text-slate-600" />
                                            Usage Limits
                                        </CardTitle>
                                        <CardDescription>
                                            Set rate limits and quotas for {provider.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor={`requestsPerDay-${provider.id}`} className="text-slate-700 font-medium">
                                                    Requests Per Day
                                                </Label>
                                                <Input
                                                    id={`requestsPerDay-${provider.id}`}
                                                    type="number"
                                                    value={provider.limits.requestsPerDay}
                                                    onChange={(e) => handleUpdateLimits(
                                                        provider.id,
                                                        'requestsPerDay',
                                                        parseInt(e.target.value)
                                                    )}
                                                    min="0"
                                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`tokensPerRequest-${provider.id}`} className="text-slate-700 font-medium">
                                                    Max Tokens Per Request
                                                </Label>
                                                <Input
                                                    id={`tokensPerRequest-${provider.id}`}
                                                    type="number"
                                                    value={provider.limits.tokensPerRequest}
                                                    onChange={(e) => handleUpdateLimits(
                                                        provider.id,
                                                        'tokensPerRequest',
                                                        parseInt(e.target.value)
                                                    )}
                                                    min="0"
                                                    className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-amber-800">Rate Limiting</p>
                                                <p className="text-sm text-amber-700/90 mt-1 leading-relaxed">
                                                    These limits help prevent excessive API usage and control costs.
                                                    Adjust based on your needs and provider quotas.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column: Statistics */}
                            <div className="space-y-6">
                                <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden h-full">
                                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-slate-600" />
                                            Usage Statistics
                                        </CardTitle>
                                        <CardDescription>
                                            Current usage for {provider.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium text-slate-500">Total Requests</span>
                                                    <Activity size={16} className="text-blue-500" />
                                                </div>
                                                <span className="text-2xl font-bold text-slate-900">
                                                    {provider.usage.requests.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium text-slate-500">Total Tokens Used</span>
                                                    <Cpu size={16} className="text-purple-500" />
                                                </div>
                                                <span className="text-2xl font-bold text-slate-900">
                                                    {provider.usage.tokens.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium text-slate-500">Estimated Cost</span>
                                                    <TrendingUp size={16} className="text-emerald-500" />
                                                </div>
                                                <span className="text-2xl font-bold text-slate-900">
                                                    ${provider.usage.cost.toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-slate-700">Daily Limit Progress</span>
                                                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
                                                        {Math.round((provider.usage.requests / provider.limits.requestsPerDay) * 100)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                    <div
                                                        className="bg-[#3A7AFE] h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${Math.min((provider.usage.requests / provider.limits.requestsPerDay) * 100, 100)}%`
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-xs text-slate-400 mt-2 text-right">
                                                    {provider.usage.requests} / {provider.limits.requestsPerDay} requests
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default AIConfiguration;
