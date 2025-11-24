import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Share2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolPageTemplateProps {
    // Tool Information
    toolTitle: string;
    toolIcon: string;
    toolDescription: string;
    toolCategory: string;

    // Input Section
    inputModule: ReactNode;

    // Output Section
    outputModule?: ReactNode;
    hasOutput?: boolean;

    // Optional Sections
    faqs?: { question: string; answer: string }[];
    examples?: { title: string; description: string }[];
    relatedTools?: { name: string; icon: string; url: string }[];

    // SEO
    seoDescription?: string;
}

export const ToolPageTemplate: React.FC<ToolPageTemplateProps> = ({
    toolTitle,
    toolIcon,
    toolDescription,
    toolCategory,
    inputModule,
    outputModule,
    hasOutput = false,
    faqs = [],
    examples = [],
    relatedTools = [],
    seoDescription,
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Tool Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-6xl">{toolIcon}</div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold text-gray-900">{toolTitle}</h1>
                                <Badge className="bg-gradient-to-r from-[#3A7AFE] to-[#9333EA] text-white">
                                    {toolCategory}
                                </Badge>
                            </div>
                            <p className="text-lg text-gray-600">{toolDescription}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Input Module */}
                        <Card className="card-zentryx">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Info className="w-6 h-6 text-[#3A7AFE]" />
                                    Input
                                </h2>
                                {inputModule}
                            </div>
                        </Card>

                        {/* Output Module */}
                        {hasOutput && outputModule && (
                            <Card className="card-zentryx">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                            <Info className="w-6 h-6 text-[#3A7AFE]" />
                                            Output
                                        </h2>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="gap-2">
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </Button>
                                            <Button size="sm" variant="outline" className="gap-2">
                                                <Download className="w-4 h-4" />
                                                Download
                                            </Button>
                                            <Button size="sm" variant="outline" className="gap-2">
                                                <Share2 className="w-4 h-4" />
                                                Share
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[200px]">
                                        {outputModule}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Examples Section */}
                        {examples.length > 0 && (
                            <Card className="card-zentryx">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
                                    <div className="space-y-4">
                                        {examples.map((example, index) => (
                                            <div key={index} className="border-l-4 border-[#3A7AFE] pl-4 py-2">
                                                <h3 className="font-semibold text-gray-900 mb-1">{example.title}</h3>
                                                <p className="text-gray-600 text-sm">{example.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* FAQs Section */}
                        {faqs.length > 0 && (
                            <Card className="card-zentryx">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {faqs.map((faq, index) => (
                                            <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* SEO Description */}
                        {seoDescription && (
                            <Card className="card-zentryx bg-gradient-to-br from-blue-50 to-purple-50">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">About This Tool</h2>
                                    <p className="text-gray-700 leading-relaxed">{seoDescription}</p>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Related Tools */}
                        {relatedTools.length > 0 && (
                            <Card className="card-zentryx">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                                    <div className="space-y-3">
                                        {relatedTools.map((tool, index) => (
                                            <Link to={tool.url} key={index}>
                                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                                                    <div className="text-2xl">{tool.icon}</div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 group-hover:text-[#3A7AFE] transition-colors">
                                                            {tool.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Quick Tips */}
                        <Card className="card-zentryx bg-gradient-to-br from-green-50 to-emerald-50">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Quick Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>No signup required</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>100% free to use</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>Works offline</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>Privacy-focused</span>
                                    </li>
                                </ul>
                            </div>
                        </Card>

                        {/* Share Tool */}
                        <Card className="card-zentryx bg-gradient-to-br from-purple-50 to-pink-50">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Share This Tool</h3>
                                <Button className="w-full btn-primary">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share Tool
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolPageTemplate;
