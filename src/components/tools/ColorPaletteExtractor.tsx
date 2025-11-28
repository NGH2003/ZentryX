import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Copy } from "lucide-react";

const ColorPaletteExtractor = () => {
    const [image, setImage] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImage(result);
                extractColors(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const extractColors = (imgSrc: string) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Resize for performance
            const scale = Math.min(1, 200 / Math.max(img.width, img.height));
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const colorCounts: { [key: string]: number } = {};

            // Sample pixels
            for (let i = 0; i < imageData.length; i += 4 * 5) { // Skip some pixels for speed
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                const a = imageData[i + 3];

                if (a < 128) continue; // Skip transparent

                // Quantize colors (group similar colors)
                const round = (n: number) => Math.round(n / 32) * 32;
                const key = `${round(r)},${round(g)},${round(b)}`;

                colorCounts[key] = (colorCounts[key] || 0) + 1;
            }

            // Sort by frequency
            const sortedColors = Object.entries(colorCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([key]) => {
                    const [r, g, b] = key.split(",").map(Number);
                    return rgbToHex(r, g, b);
                });

            setPalette(sortedColors);
        };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    };

    const copyColor = (color: string) => {
        navigator.clipboard.writeText(color);
        toast({ title: "Copied!", description: `${color} copied to clipboard` });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Color Palette Extractor</CardTitle>
                    <CardDescription>Extract dominant colors from any image</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!image ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="palette-upload"
                            />
                            <Label htmlFor="palette-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload an image</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex justify-center bg-gray-100 rounded-lg p-4">
                                <img src={image} alt="Uploaded" className="max-h-64 object-contain" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Dominant Colors</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {palette.map((color, i) => (
                                        <div
                                            key={i}
                                            className="group relative h-24 rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-105"
                                            style={{ backgroundColor: color }}
                                            onClick={() => copyColor(color)}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity rounded-lg">
                                                <span className="text-white font-mono font-bold">{color}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" onClick={() => setImage(null)} className="w-full">
                                    Upload New Image
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ColorPaletteExtractor;
