
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ContrastChecker = () => {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = () => {
    const fg = hexToRgb(foreground);
    const bg = hexToRgb(background);
    
    if (!fg || !bg) return 1;
    
    const fgLum = getLuminance(fg.r, fg.g, fg.b);
    const bgLum = getLuminance(bg.r, bg.g, bg.b);
    
    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    
    return (lighter + 0.05) / (darker + 0.05);
  };

  const ratio = getContrastRatio();
  const wcagAA = ratio >= 4.5;
  const wcagAAA = ratio >= 7;
  const wcagAALarge = ratio >= 3;

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Contrast Checker</CardTitle>
          <CardDescription>
            Check color contrast for accessibility compliance (WCAG guidelines)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Foreground Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <Input
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <Input
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="p-8 rounded-lg border-2 text-center"
              style={{ backgroundColor: background, color: foreground }}
            >
              <h3 className="text-2xl font-bold mb-2">Sample Text</h3>
              <p className="text-lg">This is how your text will look</p>
              <p className="text-sm">Small text example for testing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{ratio.toFixed(2)}:1</div>
                  <div className="text-sm text-gray-600">Contrast Ratio</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">WCAG AA (Normal Text)</span>
                  <Badge variant={wcagAA ? "default" : "destructive"}>
                    {wcagAA ? "Pass" : "Fail"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">WCAG AA (Large Text)</span>
                  <Badge variant={wcagAALarge ? "default" : "destructive"}>
                    {wcagAALarge ? "Pass" : "Fail"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">WCAG AAA</span>
                  <Badge variant={wcagAAA ? "default" : "destructive"}>
                    {wcagAAA ? "Pass" : "Fail"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>• WCAG AA requires a contrast ratio of at least 4.5:1 for normal text</p>
              <p>• WCAG AA requires a contrast ratio of at least 3:1 for large text (18pt+ or 14pt+ bold)</p>
              <p>• WCAG AAA requires a contrast ratio of at least 7:1 for normal text</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContrastChecker;
