
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const ColorPicker = () => {
  const [color, setColor] = useState("#3b82f6");
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${format} color value copied to clipboard`
    });
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Color Picker</CardTitle>
          <CardDescription>
            Pick colors and convert between different formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">HEX Color</label>
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">HEX</label>
              <div className="flex">
                <Input value={color} readOnly className="rounded-r-none" />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => copyToClipboard(color, "HEX")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {rgb && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">RGB</label>
                <div className="flex">
                  <Input 
                    value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} 
                    readOnly 
                    className="rounded-r-none" 
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {hsl && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">HSL</label>
                <div className="flex">
                  <Input 
                    value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} 
                    readOnly 
                    className="rounded-r-none" 
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div 
            className="w-full h-24 rounded-lg border-2 border-gray-300"
            style={{ backgroundColor: color }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPicker;
