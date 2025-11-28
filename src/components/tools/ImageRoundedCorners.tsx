import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload } from "lucide-react";

const ImageRoundedCorners = () => {
    const [image, setImage] = useState<string | null>(null);
    const [radius, setRadius] = useState(50);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (image) drawRounded();
    }, [image, radius]);

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

    const drawRounded = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw rounded rect path
            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(canvas.width - radius, 0);
            ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
            ctx.lineTo(canvas.width, canvas.height - radius);
            ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
            ctx.lineTo(radius, canvas.height);
            ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();

            // Clip and draw
            ctx.clip();
            ctx.drawImage(img, 0, 0);
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "rounded-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({ title: "Downloaded!", description: "Image saved successfully" });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Rounded Corners</CardTitle>
                    <CardDescription>Add rounded corners to your images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!image ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="rounded-upload"
                            />
                            <Label htmlFor="rounded-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload an image</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="border rounded-lg overflow-hidden bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYelDQAAACVJREFUOE9j/P///38GKgI2NjYMIykpKTEwMDCiS44aMGrAqAEjAQA2d1wB6i5p1QAAAABJRU5ErkJggg==')] flex items-center justify-center p-4">
                                <canvas ref={canvasRef} className="max-w-full h-auto" />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Corner Radius: {radius}px</Label>
                                    <Slider value={[radius]} onValueChange={(v) => setRadius(v[0])} min={0} max={500} />
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={downloadImage} className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PNG
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

export default ImageRoundedCorners;
