import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, RefreshCcw } from "lucide-react";

const ImageFilters = () => {
    const [image, setImage] = useState<string | null>(null);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [blur, setBlur] = useState(0);
    const [sepia, setSepia] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (image) applyFilters();
    }, [image, brightness, contrast, saturation, grayscale, blur, sepia]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const applyFilters = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Apply filters using CSS filter syntax on the context
            ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px) sepia(${sepia}%)`;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "filtered-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({ title: "Downloaded!", description: "Image saved successfully" });
    };

    const resetFilters = () => {
        setBrightness(100);
        setContrast(100);
        setSaturation(100);
        setGrayscale(0);
        setBlur(0);
        setSepia(0);
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Image Filters</CardTitle>
                    <CardDescription>Apply professional filters to your photos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!image ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload an image</span>
                                <span className="text-sm text-muted-foreground">JPG, PNG, WebP supported</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 border rounded-lg overflow-hidden bg-checkerboard flex items-center justify-center bg-gray-100">
                                <canvas ref={canvasRef} className="max-w-full h-auto" />
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Adjustments</h3>
                                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                                        <RefreshCcw className="w-4 h-4 mr-2" />
                                        Reset
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Brightness ({brightness}%)</Label>
                                        <Slider value={[brightness]} onValueChange={(v) => setBrightness(v[0])} min={0} max={200} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Contrast ({contrast}%)</Label>
                                        <Slider value={[contrast]} onValueChange={(v) => setContrast(v[0])} min={0} max={200} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Saturation ({saturation}%)</Label>
                                        <Slider value={[saturation]} onValueChange={(v) => setSaturation(v[0])} min={0} max={200} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Grayscale ({grayscale}%)</Label>
                                        <Slider value={[grayscale]} onValueChange={(v) => setGrayscale(v[0])} min={0} max={100} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Sepia ({sepia}%)</Label>
                                        <Slider value={[sepia]} onValueChange={(v) => setSepia(v[0])} min={0} max={100} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Blur ({blur}px)</Label>
                                        <Slider value={[blur]} onValueChange={(v) => setBlur(v[0])} min={0} max={20} step={0.5} />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={downloadImage} className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                    <Button variant="outline" onClick={() => setImage(null)} className="w-full">
                                        Change Image
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ImageFilters;
