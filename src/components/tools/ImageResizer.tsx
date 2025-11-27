import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, Image as ImageIcon } from "lucide-react";

const ImageResizer = () => {
    const [image, setImage] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState({ w: 0, h: 0 });
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [quality, setQuality] = useState<number>(90);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setOriginalDimensions({ w: img.width, h: img.height });
                setWidth(img.width);
                setHeight(img.height);
                setImage(event.target?.result as string);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value) || 0;
        setWidth(newWidth);
        if (maintainAspectRatio && originalDimensions.w > 0) {
            const ratio = originalDimensions.h / originalDimensions.w;
            setHeight(Math.round(newWidth * ratio));
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = parseInt(e.target.value) || 0;
        setHeight(newHeight);
        if (maintainAspectRatio && originalDimensions.h > 0) {
            const ratio = originalDimensions.w / originalDimensions.h;
            setWidth(Math.round(newHeight * ratio));
        }
    };

    const downloadImage = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = width;
            canvas.height = height;
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
                const link = document.createElement('a');
                link.download = `resized-image-${width}x${height}.jpg`;
                link.href = dataUrl;
                link.click();
            }
        };
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 font-medium">Click or drag image to upload</p>
                        <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WebP</p>
                    </div>
                </CardContent>
            </Card>

            {image && (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resize Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
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

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="aspect"
                                    checked={maintainAspectRatio}
                                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="aspect">Maintain Aspect Ratio</Label>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Quality (JPEG)</Label>
                                    <span className="text-sm text-gray-500">{quality}%</span>
                                </div>
                                <Slider
                                    value={[quality]}
                                    onValueChange={(vals) => setQuality(vals[0])}
                                    min={10}
                                    max={100}
                                    step={1}
                                />
                            </div>

                            <Button onClick={downloadImage} className="w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Download Resized Image
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center bg-slate-100 min-h-[300px] rounded-md overflow-hidden">
                            <img
                                src={image}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    width: 'auto',
                                    height: 'auto'
                                }}
                            />
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ImageResizer;
