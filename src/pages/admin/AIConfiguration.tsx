import { useState, useEffect } from 'react';
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
    Activity
} from 'lucide-react';
import { toast } from 'sonner';

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
    const [usageStats, setUsageStats] = useState({
        totalRequests: 0,
        totalTokens: 0,
        totalCost: 0,
        activeProviders: 0
    });

    useEffect(() => {
        // Load saved configuration from localStorage
        const savedConfig = localStorage.getItem('aiConfiguration');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                // Merge saved config with default providers to ensure new providers (Groq) appear
                // and old providers (Grok) are removed, while preserving user settings
                const mergedProviders = providers.map(defaultProvider => {
                    const savedProvider = config.providers?.find((p: AIProvider) => p.id === defaultProvider.id);
                    if (savedProvider) {
                        // Migration logic: Always update models to the latest default list
                        // This ensures new models (gpt-4o, llama3, etc.) appear for existing users
                        const models = defaultProvider.models;

                        return {
                            ...defaultProvider,
                            // Only preserve user-configurable fields
                            apiKey: savedProvider.apiKey,
                            status: savedProvider.status,
                            limits: savedProvider.limits,
                            usage: savedProvider.usage,
                            models: models // Use updated models list
                        };
                    }
                    return defaultProvider;
                });
                setProviders(mergedProviders);
            } catch (error) {
                console.error('Error loading AI configuration:', error);
            }
        }
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

            // In a real app, you would also save to backend
            // await fetch('/api/admin/ai-config', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(config)
            // });

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

    const currentProvider = providers.find(p => p.id === selectedProvider);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">AI Configuration</h2>
                <p className="text-gray-600 mt-1">Manage AI providers, API keys, and usage limits</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{usageStats.totalRequests.toLocaleString()}</p>
                            </div>
                            <Activity className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Tokens</p>
                                <p className="text-2xl font-bold text-gray-900">{usageStats.totalTokens.toLocaleString()}</p>
                            </div>
                            <Zap className="w-8 h-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Cost</p>
                                <p className="text-2xl font-bold text-gray-900">${usageStats.totalCost.toFixed(2)}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Providers</p>
                                <p className="text-2xl font-bold text-gray-900">{usageStats.activeProviders}/{providers.length}</p>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Configuration */}
            <Tabs value={selectedProvider} onValueChange={setSelectedProvider}>
                <TabsList className="grid w-full grid-cols-4">
                    {providers.map(provider => (
                        <TabsTrigger key={provider.id} value={provider.id} className="flex items-center gap-2">
                            <span>{provider.icon}</span>
                            <span>{provider.name}</span>
                            {provider.status === 'active' && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            )}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {providers.map(provider => (
                    <TabsContent key={provider.id} value={provider.id} className="space-y-6">
                        {/* API Configuration */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="w-5 h-5" />
                                    API Configuration
                                </CardTitle>
                                <CardDescription>
                                    Configure {provider.name} API settings and credentials
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* API Key */}
                                <div className="space-y-2">
                                    <Label htmlFor={`apiKey-${provider.id}`}>API Key</Label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                id={`apiKey-${provider.id}`}
                                                type={showApiKey[provider.id] ? 'text' : 'password'}
                                                value={provider.apiKey}
                                                onChange={(e) => handleUpdateProvider(provider.id, 'apiKey', e.target.value)}
                                                placeholder={`Enter your ${provider.name} API key`}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => toggleApiKeyVisibility(provider.id)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                                        >
                                            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                            Test
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Get your API key from the {provider.name} dashboard
                                    </p>
                                </div>

                                {/* Model Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor={`model-${provider.id}`}>Default Model</Label>
                                    <Select defaultValue={provider.models[0]}>
                                        <SelectTrigger id={`model-${provider.id}`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {provider.models.map(model => (
                                                <SelectItem key={model} value={model}>
                                                    {model}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status Toggle */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${provider.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                                            }`} />
                                        <div>
                                            <p className="font-medium text-gray-900">Provider Status</p>
                                            <p className="text-sm text-gray-600">
                                                {provider.status === 'active' ? 'Active and ready to use' : 'Inactive'}
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={provider.status === 'active'}
                                        onCheckedChange={(checked) =>
                                            handleUpdateProvider(provider.id, 'status', checked ? 'active' : 'inactive')
                                        }
                                    />
                                </div>

                                {/* Save Button */}
                                <Button
                                    onClick={() => handleSaveProvider(provider.id)}
                                    disabled={isLoading}
                                    className="w-full"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Configuration
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Usage Limits */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Usage Limits
                                </CardTitle>
                                <CardDescription>
                                    Set rate limits and quotas for {provider.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`requestsPerDay-${provider.id}`}>
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
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`tokensPerRequest-${provider.id}`}>
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
                                        />
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-yellow-800">Rate Limiting</p>
                                            <p className="text-sm text-yellow-700 mt-1">
                                                These limits help prevent excessive API usage and control costs.
                                                Adjust based on your needs and provider quotas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Usage Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" />
                                    Usage Statistics
                                </CardTitle>
                                <CardDescription>
                                    Current usage for {provider.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Total Requests</span>
                                        <span className="font-semibold text-gray-900">
                                            {provider.usage.requests.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Total Tokens Used</span>
                                        <span className="font-semibold text-gray-900">
                                            {provider.usage.tokens.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Estimated Cost</span>
                                        <span className="font-semibold text-gray-900">
                                            ${provider.usage.cost.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <span className="text-blue-700">Daily Limit Progress</span>
                                        <span className="font-semibold text-blue-900">
                                            {provider.usage.requests} / {provider.limits.requestsPerDay}
                                        </span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{
                                                width: `${Math.min((provider.usage.requests / provider.limits.requestsPerDay) * 100, 100)}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default AIConfiguration;
