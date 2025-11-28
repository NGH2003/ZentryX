import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload } from "lucide-react";

const ImageWatermark = () => {
    const [image, setImage] = useState<string | null>(null);
    const [watermarkText, setWatermarkText] = useState("Confidential");
    const [fontSize, setFontSize] = useState(48);
    const [opacity, setOpacity] = useState(0.5);
    const [color, setColor] = useState("#ffffff");
    const [position, setPosition] = useState("center");

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (image) drawWatermark();
    }, [image, watermarkText, fontSize, opacity, color, position]);

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

    const drawWatermark = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Configure text
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            let x = canvas.width / 2;
            let y = canvas.height / 2;

            switch (position) {
                case "top-left":
                    x = 20 + (ctx.measureText(watermarkText).width / 2);
                    y = fontSize;
                    break;
                case "top-right":
                    x = canvas.width - 20 - (ctx.measureText(watermarkText).width / 2);
                    y = fontSize;
                    break;
                case "bottom-left":
                    x = 20 + (ctx.measureText(watermarkText).width / 2);
                    y = canvas.height - fontSize;
                    break;
                case "bottom-right":
                    x = canvas.width - 20 - (ctx.measureText(watermarkText).width / 2);
                    y = canvas.height - fontSize;
                    break;
                case "center":
                default:
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    break;
            }

            ctx.fillText(watermarkText, x, y);

            // Reset
            ctx.globalAlpha = 1.0;
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "watermarked-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({ title: "Downloaded!", description: "Image saved successfully" });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Image Watermark</CardTitle>
                    <CardDescription>Add text watermarks to your images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!image ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="watermark-upload"
                            />
                            <Label htmlFor="watermark-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload an image</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                <canvas ref={canvasRef} className="max-w-full h-auto" />
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Watermark Text</Label>
                                        <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Position</Label>
                                        <Select value={position} onValueChange={setPosition}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select position" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="center">Center</SelectItem>
                                                <SelectItem value="top-left">Top Left</SelectItem>
                                                <SelectItem value="top-right">Top Right</SelectItem>
                                                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Font Size: {fontSize}px</Label>
                                        <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={12} max={200} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Opacity: {Math.round(opacity * 100)}%</Label>
                                        <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={1} step={0.1} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Color</Label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="h-10 w-full cursor-pointer rounded-md border border-input"
                                            />
                                        </div>
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

export default ImageWatermark;
