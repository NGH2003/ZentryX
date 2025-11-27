import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AspectRatioCalculator = () => {
    const [width, setWidth] = useState<number>(1920);
    const [height, setHeight] = useState<number>(1080);
    const [ratio, setRatio] = useState<string>("16:9");
    const { toast } = useToast();

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    useEffect(() => {
        if (width && height) {
            const divisor = gcd(width, height);
            setRatio(`${width / divisor}:${height / divisor}`);
        }
    }, [width, height]);

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWidth(parseInt(e.target.value) || 0);
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(parseInt(e.target.value) || 0);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Copied to clipboard",
        });
    };

    const commonResolutions = [
        { w: 1920, h: 1080, label: "1080p (HD)" },
        { w: 1280, h: 720, label: "720p (HD)" },
        { w: 3840, h: 2160, label: "4K (UHD)" },
        { w: 1080, h: 1080, label: "Instagram Square" },
        { w: 1080, h: 1350, label: "Instagram Portrait" },
        { w: 1080, h: 1920, label: "Instagram Story" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Calculate Ratio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="width">Width (px)</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    value={width}
                                    onChange={handleWidthChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height">Height (px)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    value={height}
                                    onChange={handleHeightChange}
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-slate-100 rounded-lg text-center">
                            <div className="text-sm text-gray-500 mb-1">Aspect Ratio</div>
                            <div className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-2">
                                {ratio}
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(ratio)}>
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Common Resolutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            {commonResolutions.map((res) => (
                                <Button
                                    key={res.label}
                                    variant="outline"
                                    className="justify-start h-auto py-2 flex-col items-start"
                                    onClick={() => {
                                        setWidth(res.w);
                                        setHeight(res.h);
                                    }}
                                >
                                    <span className="font-medium">{res.label}</span>
                                    <span className="text-xs text-gray-500">{res.w} x {res.h}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AspectRatioCalculator;
