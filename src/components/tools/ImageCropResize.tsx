import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Crop as CropIcon, RefreshCw } from "lucide-react";

const ImageCropResize = () => {
    const [image, setImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [resizeWidth, setResizeWidth] = useState(0);
    const [resizeHeight, setResizeHeight] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                imgRef.current = img;
                setResizeWidth(img.width);
                setResizeHeight(img.height);
                drawCanvas();
            };
        }
    }, [image]);

    useEffect(() => {
        drawCanvas();
    }, [crop, resizeWidth, resizeHeight]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setCrop({ x: 0, y: 0, width: 0, height: 0 });
            };
            reader.readAsDataURL(file);
        }
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas to display size (scaled down if image is huge)
        // For simplicity, we'll keep canvas at image size but style it to fit
        // Actually, for cropping interaction, it's better to match 1:1 or handle scaling.
        // Let's handle scaling.
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw crop overlay
        if (crop.width > 0 && crop.height > 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Clear the crop area
            ctx.clearRect(crop.x * scale, crop.y * scale, crop.width * scale, crop.height * scale);
            ctx.drawImage(
                img,
                crop.x, crop.y, crop.width, crop.height,
                crop.x * scale, crop.y * scale, crop.width * scale, crop.height * scale
            );

            // Draw border
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.strokeRect(crop.x * scale, crop.y * scale, crop.width * scale, crop.height * scale);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!imgRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = imgRef.current.width / canvas.width;
        const scaleY = imgRef.current.height / canvas.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setIsDragging(true);
        setStartPos({ x, y });
        setCrop({ x, y, width: 0, height: 0 });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !imgRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = imgRef.current.width / canvas.width;
        const scaleY = imgRef.current.height / canvas.height;

        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;

        const width = currentX - startPos.x;
        const height = currentY - startPos.y;

        setCrop({
            x: width > 0 ? startPos.x : currentX,
            y: height > 0 ? startPos.y : currentY,
            width: Math.abs(width),
            height: Math.abs(height)
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const applyCrop = () => {
        if (!imgRef.current || crop.width === 0 || crop.height === 0) return;

        const canvas = document.createElement("canvas");
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(
            imgRef.current,
            crop.x, crop.y, crop.width, crop.height,
            0, 0, crop.width, crop.height
        );

        setImage(canvas.toDataURL());
        setCrop({ x: 0, y: 0, width: 0, height: 0 });
        toast({ title: "Cropped!", description: "Image cropped successfully" });
    };

    const applyResize = () => {
        if (!imgRef.current) return;

        const canvas = document.createElement("canvas");
        canvas.width = resizeWidth;
        canvas.height = resizeHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(imgRef.current, 0, 0, resizeWidth, resizeHeight);

        setImage(canvas.toDataURL());
        toast({ title: "Resized!", description: "Image resized successfully" });
    };

    const downloadImage = () => {
        if (!image) return;
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = image;
        link.click();
        toast({ title: "Downloaded!", description: "Image saved successfully" });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Crop & Resize</CardTitle>
                    <CardDescription>Drag to crop or enter dimensions to resize</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!image ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="crop-upload"
                            />
                            <Label htmlFor="crop-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload an image</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-crosshair">
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    className="max-w-full h-auto"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <CropIcon className="w-4 h-4" /> Crop
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Drag on the image to select an area.</p>
                                    <Button onClick={applyCrop} disabled={crop.width === 0} className="w-full">
                                        Apply Crop
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <RefreshCw className="w-4 h-4" /> Resize
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Width (px)</Label>
                                            <Input
                                                type="number"
                                                value={resizeWidth}
                                                onChange={(e) => setResizeWidth(parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Height (px)</Label>
                                            <Input
                                                type="number"
                                                value={resizeHeight}
                                                onChange={(e) => setResizeHeight(parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={applyResize} variant="secondary" className="w-full">
                                        Apply Resize
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t">
                                <Button onClick={downloadImage} className="flex-1">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Result
                                </Button>
                                <Button variant="outline" onClick={() => setImage(null)}>
                                    New Image
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ImageCropResize;
