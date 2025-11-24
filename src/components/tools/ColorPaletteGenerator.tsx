import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ColorPaletteGenerator = () => {
  const { toast } = useToast();
  const [palette, setPalette] = useState<string[]>([]);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () => generateRandomColor());
    setPalette(newPalette);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`
    });
  };

  const copyAllColors = () => {
    navigator.clipboard.writeText(palette.join(', '));
    toast({
      title: "Copied!",
      description: "All colors copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Color Palette Generator</CardTitle>
          <CardDescription>Generate random color palettes for your designs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={generatePalette} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Palette
            </Button>
            {palette.length > 0 && (
              <Button onClick={copyAllColors} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            )}
          </div>

          {palette.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="w-24 h-24 rounded-lg shadow-md"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <p className="font-mono text-lg font-semibold">{color}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyColor(color)}
                      className="mt-2"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPaletteGenerator;
