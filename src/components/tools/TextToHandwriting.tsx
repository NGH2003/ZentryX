import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

const TextToHandwriting = () => {
    const [text, setText] = useState("Hello, this is a handwritten note.");
    const [fontSize, setFontSize] = useState(24);
    const [color, setColor] = useState("#000000");
    const [fontFamily, setFontFamily] = useState("'Brush Script MT', cursive");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        draw();
    }, [text, fontSize, color, fontFamily]);

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Setup canvas
        const lineHeight = fontSize * 1.5;
        const lines = text.split("\n");
        const maxWidth = 800;
        const height = Math.max(400, lines.length * lineHeight + 100);

        canvas.width = maxWidth;
        canvas.height = height;

        // Background (Paper look)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw lines (notebook style)
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        for (let y = lineHeight; y < height; y += lineHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(maxWidth, y);
            ctx.stroke();
        }

        // Draw text
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textBaseline = "bottom";

        lines.forEach((line, index) => {
            // Add a slight random offset for "human" feel
            const x = 20 + Math.random() * 2;
            const y = (index + 1) * lineHeight - 5 + Math.random() * 2;
            ctx.fillText(line, x, y);
        });
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "handwriting.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({
            title: "Downloaded!",
            description: "Image saved successfully",
        });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Text to Handwriting</CardTitle>
                    <CardDescription>Convert typed text into a handwritten-style image</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Your Text</Label>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={5}
                            className="font-sans"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Font Size: {fontSize}px</Label>
                            <Slider
                                value={[fontSize]}
                                onValueChange={(v) => setFontSize(v[0])}
                                min={12}
                                max={72}
                                step={1}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Ink Color</Label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded-md border border-input"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Handwriting Style</Label>
                            <Select value={fontFamily} onValueChange={setFontFamily}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="'Brush Script MT', cursive">Cursive</SelectItem>
                                    <SelectItem value="'Comic Sans MS', cursive">Print</SelectItem>
                                    <SelectItem value="monospace">Monospace</SelectItem>
                                    <SelectItem value="serif">Serif</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden shadow-sm">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-auto block"
                        />
                    </div>

                    <Button onClick={downloadImage} className="w-full" size="lg">
                        <Download className="w-4 h-4 mr-2" />
                        Download Image
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default TextToHandwriting;
