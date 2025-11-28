import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload } from "lucide-react";

const ImageToSketch = () => {
    const [image, setImage] = useState<string | null>(null);
    const [intensity, setIntensity] = useState(5); // Blur amount
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (image) generateSketch();
    }, [image, intensity]);

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

    const generateSketch = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // 1. Draw Grayscale
            ctx.filter = "grayscale(100%)";
            ctx.drawImage(img, 0, 0);

            // Get the grayscale data
            const grayData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // 2. Create Inverted layer
            ctx.globalCompositeOperation = "source-over";
            ctx.filter = `grayscale(100%) invert(100%) blur(${intensity}px)`;
            ctx.drawImage(img, 0, 0);

            // 3. Blend with Color Dodge
            // Note: Canvas 'color-dodge' might not perfectly match Photoshop's.
            // A better approach for "pencil sketch" in pure JS pixel manipulation:
            // Result = Grayscale / (1 - InvertedBlurred)
            // But let's try the composite operation first as it's faster.

            // Actually, to do it properly with composite:
            // Layer 1: Grayscale
            // Layer 2: Inverted Grayscale with Blur, blended with Color Dodge.

            // Let's redraw Layer 1 (Grayscale)
            ctx.filter = "grayscale(100%)";
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(img, 0, 0);

            // Layer 2 (Inverted + Blur)
            // We need an offscreen canvas for the blurred inverted image
            const offCanvas = document.createElement("canvas");
            offCanvas.width = canvas.width;
            offCanvas.height = canvas.height;
            const offCtx = offCanvas.getContext("2d");
            if (offCtx) {
                offCtx.filter = `grayscale(100%) invert(100%) blur(${intensity}px)`;
                offCtx.drawImage(img, 0, 0);

                // Blend
                ctx.globalCompositeOperation = "color-dodge";
                ctx.drawImage(offCanvas, 0, 0);

                // Reset
                ctx.globalCompositeOperation = "source-over";
                ctx.filter = "none";
            }
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "sketch.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({ title: "Downloaded!", description: "Sketch saved successfully" });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Image to Sketch</CardTitle>
                    <CardDescription>Convert photos into pencil sketches instantly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!image ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="sketch-upload"
                            />
                            <Label htmlFor="sketch-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload an image</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                <canvas ref={canvasRef} className="max-w-full h-auto" />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Sketch Intensity (Blur Radius): {intensity}px</Label>
                                    <Slider value={[intensity]} onValueChange={(v) => setIntensity(v[0])} min={0} max={20} step={0.5} />
                                    <p className="text-xs text-muted-foreground">Adjust intensity to refine the sketch lines.</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={downloadImage} className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Sketch
                                    </Button>
                                    <Button variant="outline" onClick={() => setImage(null)} className="w-full">
                                        New Image
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

export default ImageToSketch;
