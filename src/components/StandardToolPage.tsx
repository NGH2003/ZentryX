import React, { ReactNode, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Copy,
    Download,
    Share2,
    Info,
    Shield,
    Lock,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { AdUnit } from '@/components/AdUnit';

interface Example {
    title: string;
    input: string;
    output: string;
    description?: string;
}

interface FAQ {
    question: string;
    answer: string;
}

interface RelatedTool {
    name: string;
    icon: string;
    url: string;
    description?: string;
}

interface ToolPageTemplateProps {
    // Tool Information
    toolTitle: string;
    toolIcon: string;
    toolDescription: string;
    toolCategory: string;

    // Input Section
    inputSection: ReactNode;

    // Output Section
    outputSection?: ReactNode;
    outputValue?: string;
    onCopy?: () => void;
    onDownload?: () => void;
    onShare?: () => void;

    // Optional Sections
    examples?: Example[];
    faqs?: FAQ[];
    relatedTools?: RelatedTool[];

    // SEO & Trust
    seoDescription?: string;
    privacyNote?: string;
    features?: string[];
}

export const StandardToolPage: React.FC<ToolPageTemplateProps> = ({
    toolTitle,
    toolIcon,
    toolDescription,
    toolCategory,
    inputSection,
    outputSection,
    outputValue,
    onCopy,
    onDownload,
    onShare,
    examples = [],
    faqs = [],
    relatedTools = [],
    seoDescription,
    privacyNote,
    features = [
        'No signup required',
        '100% free to use',
        'Works offline',
        'Privacy-focused',
        'No data stored',
        'Instant results'
    ],
}) => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleCopy = () => {
        if (onCopy) {
            onCopy();
        } else if (outputValue) {
            navigator.clipboard.writeText(outputValue);
            toast.success('Copied to clipboard!');
        }
    };

    const handleShare = () => {
        if (onShare) {
            onShare();
        } else {
            if (navigator.share) {
                navigator.share({
                    title: toolTitle,
                    text: toolDescription,
                    url: window.location.href,
                }).catch(() => { });
            } else {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <Navigation />

            {/* Header Ad */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <AdUnit slot="header" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tool Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="text-5xl sm:text-6xl animate-bounce-slow">{toolIcon}</div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] bg-clip-text text-transparent">
                                    {toolTitle}
                                </h1>
                                <Badge className="bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] text-white hover:shadow-lg transition-shadow">
                                    {toolCategory}
                                </Badge>
                            </div>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                {toolDescription}
                            </p>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700 font-medium">Secure</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                            <Lock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-700 font-medium">Private</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-purple-700 font-medium">Fast</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Input Section */}
                        <Card className="card-zentryx hover-lift overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3A7AFE] to-[#9333EA] flex items-center justify-center">
                                        <Info className="w-5 h-5 text-white" />
                                    </div>
                                    Input
                                </h2>
                                <div className="space-y-4">
                                    {inputSection}
                                </div>
                            </div>
                        </Card>

                        {/* Output Section */}
                        {outputSection && (
                            <Card className="card-zentryx hover-lift overflow-hidden animate-scale-in">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                                <CheckCircle2 className="w-5 h-5 text-white" />
                                            </div>
                                            Output
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                onClick={handleCopy}
                                            >
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </Button>
                                            {onDownload && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-2 hover:bg-green-50 hover:border-green-300 transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                    onClick={onDownload}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="gap-2 hover:bg-purple-50 hover:border-purple-300 transition-all focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                onClick={handleShare}
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[200px] transition-all hover:border-gray-300 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
                                        {outputSection}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Examples Section */}
                        {examples.length > 0 && (
                            <Card className="card-zentryx hover-lift overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-2xl">💡</span>
                                        Examples
                                    </h2>
                                    <div className="space-y-4">
                                        {examples.map((example, index) => (
                                            <div
                                                key={index}
                                                className="border-l-4 border-[#3A7AFE] pl-4 py-3 bg-blue-50/50 rounded-r-lg hover:bg-blue-50 transition-colors"
                                            >
                                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-[#3A7AFE] text-white text-xs flex items-center justify-center">
                                                        {index + 1}
                                                    </span>
                                                    {example.title}
                                                </h3>
                                                {example.description && (
                                                    <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                                                )}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Input:</p>
                                                        <code className="block text-sm bg-white border border-gray-200 rounded px-3 py-2 font-mono">
                                                            {example.input}
                                                        </code>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Output:</p>
                                                        <code className="block text-sm bg-white border border-gray-200 rounded px-3 py-2 font-mono">
                                                            {example.output}
                                                        </code>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* FAQs Section */}
                        {faqs.length > 0 && (
                            <Card className="card-zentryx hover-lift overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-2xl">❓</span>
                                        Frequently Asked Questions
                                    </h2>
                                    <div className="space-y-3">
                                        {faqs.map((faq, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                                            >
                                                <button
                                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                                >
                                                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                                                    {expandedFaq === index ? (
                                                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                    )}
                                                </button>
                                                {expandedFaq === index && (
                                                    <div className="px-4 pb-4 text-gray-600 leading-relaxed animate-fade-in">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Privacy & Security Note */}
                        <Card className="card-zentryx bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover-lift">
                            <div className="p-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {privacyNote ||
                                                'All processing happens in your browser. Your data never leaves your device and is not stored on our servers. We prioritize your privacy and security above all else.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* SEO Description */}
                        {seoDescription && (
                            <Card className="card-zentryx bg-gradient-to-br from-blue-50 to-purple-50 hover-lift">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">About This Tool</h2>
                                    <p className="text-gray-700 leading-relaxed">{seoDescription}</p>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Features */}
                        <Card className="card-zentryx hover-lift sticky top-6">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[#3A7AFE]" />
                                    Features
                                </h3>
                                <ul className="space-y-2.5">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2.5 group">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        {/* Related Tools */}
                        {relatedTools.length > 0 && (
                            <Card className="card-zentryx hover-lift">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                                    <div className="space-y-2">
                                        {relatedTools.map((tool, index) => (
                                            <Link to={tool.url} key={index}>
                                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all cursor-pointer group border border-transparent hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <div className="text-2xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-900 group-hover:text-[#3A7AFE] transition-colors truncate">
                                                            {tool.name}
                                                        </p>
                                                        {tool.description && (
                                                            <p className="text-xs text-gray-500 truncate">{tool.description}</p>
                                                        )}
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#3A7AFE] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Share Tool */}
                        <Card className="card-zentryx bg-gradient-to-br from-purple-50 to-pink-50 hover-lift">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Share This Tool</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Found this tool helpful? Share it with others!
                                </p>
                                <Button
                                    className="w-full btn-primary hover:shadow-xl transition-all focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share Tool
                                </Button>
                            </div>
                        </Card>

                        {/* Sidebar Ad */}
                        <div className="sticky top-6">
                            <AdUnit slot="sidebar" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Ad */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <AdUnit slot="footer" />
            </div>
        </div>
    );
};

export default StandardToolPage;
