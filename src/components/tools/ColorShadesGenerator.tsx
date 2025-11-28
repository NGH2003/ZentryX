import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ColorShadesGenerator = () => {
    const [color, setColor] = useState("#3A7AFE");
    const [shades, setShades] = useState<string[]>([]);
    const [tints, setTints] = useState<string[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            generateVariations(color);
        }
    }, [color]);

    const generateVariations = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const newTints = [];
        const newShades = [];

        for (let i = 0; i <= 10; i++) {
            const factor = i / 10;

            // Tint (mix with white)
            const tr = Math.round(r + (255 - r) * factor);
            const tg = Math.round(g + (255 - g) * factor);
            const tb = Math.round(b + (255 - b) * factor);
            newTints.push(rgbToHex(tr, tg, tb));

            // Shade (mix with black)
            const sr = Math.round(r * (1 - factor));
            const sg = Math.round(g * (1 - factor));
            const sb = Math.round(b * (1 - factor));
            newShades.push(rgbToHex(sr, sg, sb));
        }

        setTints(newTints);
        setShades(newShades);
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    };

    const copyColor = (c: string) => {
        navigator.clipboard.writeText(c);
        toast({ title: "Copied!", description: `${c} copied to clipboard` });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Color Shades Generator</CardTitle>
                    <CardDescription>Generate tints and shades for any color</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="space-y-2 flex-1">
                            <Label>Base Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="font-mono"
                                    maxLength={7}
                                />
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-10 w-20 cursor-pointer rounded-md border border-input p-1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Tints (Light Variations)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-11 gap-2">
                            {tints.map((c, i) => (
                                <div
                                    key={i}
                                    className="h-16 rounded-md cursor-pointer transition-transform hover:scale-110 shadow-sm flex items-center justify-center group"
                                    style={{ backgroundColor: c }}
                                    onClick={() => copyColor(c)}
                                    title={c}
                                >
                                    <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 bg-white/80 px-1 rounded text-black">
                                        {c}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Shades (Dark Variations)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-11 gap-2">
                            {shades.map((c, i) => (
                                <div
                                    key={i}
                                    className="h-16 rounded-md cursor-pointer transition-transform hover:scale-110 shadow-sm flex items-center justify-center group"
                                    style={{ backgroundColor: c }}
                                    onClick={() => copyColor(c)}
                                    title={c}
                                >
                                    <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 bg-white/80 px-1 rounded text-black">
                                        {c}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ColorShadesGenerator;
