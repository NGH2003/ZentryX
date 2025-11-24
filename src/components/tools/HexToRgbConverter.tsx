import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const HexToRgbConverter = () => {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
    }
    return "";
  };

  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    if (result && result.length >= 3) {
      const r = parseInt(result[0]).toString(16).padStart(2, '0');
      const g = parseInt(result[1]).toString(16).padStart(2, '0');
      const b = parseInt(result[2]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
    return "";
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    const converted = hexToRgb(value);
    if (converted) setRgb(converted);
  };

  const handleRgbChange = (value: string) => {
    setRgb(value);
    const converted = rgbToHex(value);
    if (converted) setHex(converted);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color value copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>HEX to RGB Converter</CardTitle>
          <CardDescription>Convert colors between HEX and RGB formats</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="w-full h-32 rounded-lg"
            style={{ backgroundColor: hex }}
          />

          <div>
            <label className="block text-sm font-medium mb-2">HEX Color</label>
            <div className="flex space-x-2">
              <Input
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#3b82f6"
              />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(hex)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">RGB Color</label>
            <div className="flex space-x-2">
              <Input
                value={rgb}
                onChange={(e) => handleRgbChange(e.target.value)}
                placeholder="rgb(59, 130, 246)"
              />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(rgb)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HexToRgbConverter;
