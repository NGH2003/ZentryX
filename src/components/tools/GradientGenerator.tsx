import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [direction, setDirection] = useState("to right");
  const { toast } = useToast();

  const gradientCSS = `background: linear-gradient(${direction}, ${color1}, ${color2});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS);
    toast({
      title: "Copied!",
      description: "CSS gradient copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Gradient Generator</CardTitle>
          <CardDescription>Create CSS gradients with live preview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="w-full h-48 rounded-lg"
            style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color 1</label>
              <Input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-12"
              />
              <Input
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                placeholder="#3b82f6"
                className="mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color 2</label>
              <Input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-12"
              />
              <Input
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                placeholder="#8b5cf6"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Direction</label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to right">To Right</SelectItem>
                <SelectItem value="to left">To Left</SelectItem>
                <SelectItem value="to bottom">To Bottom</SelectItem>
                <SelectItem value="to top">To Top</SelectItem>
                <SelectItem value="to bottom right">To Bottom Right</SelectItem>
                <SelectItem value="to bottom left">To Bottom Left</SelectItem>
                <SelectItem value="to top right">To Top Right</SelectItem>
                <SelectItem value="to top left">To Top Left</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CSS Code</label>
            <div className="flex space-x-2">
              <Input
                value={gradientCSS}
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradientGenerator;
