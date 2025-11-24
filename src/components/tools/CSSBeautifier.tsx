import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CSSBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const beautifyCSS = (css: string) => {
    let formatted = css.replace(/\s*\{\s*/g, ' {\n  ');
    formatted = formatted.replace(/\s*\}\s*/g, '\n}\n\n');
    formatted = formatted.replace(/\s*;\s*/g, ';\n  ');
    formatted = formatted.replace(/\s*,\s*/g, ', ');
    formatted = formatted.trim();

    return formatted;
  };

  const handleBeautify = () => {
    const beautified = beautifyCSS(input);
    setOutput(beautified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Beautified CSS copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>CSS Beautifier</CardTitle>
          <CardDescription>Format and beautify CSS code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input CSS</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS code here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleBeautify} className="w-full">Beautify CSS</Button>

          {output && (
            <div>
              <label className="block text-sm font-medium mb-2">Beautified CSS</label>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  rows={10}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSBeautifier;
