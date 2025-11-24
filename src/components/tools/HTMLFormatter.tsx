import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const HTMLFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const formatHTML = (html: string) => {
    let formatted = html.replace(/>\s*</g, '>\n<');
    let indent = 0;
    const lines = formatted.split('\n');

    const result = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 2);
      }

      const indented = ' '.repeat(indent) + trimmed;

      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.match(/<.+?\/>/)) {
        indent += 2;
      }

      return indented;
    });

    return result.join('\n');
  };

  const handleFormat = () => {
    const formatted = formatHTML(input);
    setOutput(formatted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted HTML copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>HTML Formatter</CardTitle>
          <CardDescription>Format and beautify HTML code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input HTML</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleFormat} className="w-full">Format HTML</Button>

          {output && (
            <div>
              <label className="block text-sm font-medium mb-2">Formatted HTML</label>
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

export default HTMLFormatter;
