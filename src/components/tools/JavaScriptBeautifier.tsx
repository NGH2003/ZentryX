import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const JavaScriptBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const beautifyJS = (js: string) => {
    let formatted = js.replace(/\s*\{\s*/g, ' {\n  ');
    formatted = formatted.replace(/\s*\}\s*/g, '\n}\n');
    formatted = formatted.replace(/\s*;\s*/g, ';\n  ');
    formatted = formatted.replace(/,\s*/g, ',\n  ');
    formatted = formatted.trim();

    return formatted;
  };

  const handleBeautify = () => {
    const beautified = beautifyJS(input);
    setOutput(beautified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Beautified JavaScript copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>JavaScript Beautifier</CardTitle>
          <CardDescription>Format and beautify JavaScript code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input JavaScript</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleBeautify} className="w-full">Beautify JavaScript</Button>

          {output && (
            <div>
              <label className="block text-sm font-medium mb-2">Beautified JavaScript</label>
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

export default JavaScriptBeautifier;
