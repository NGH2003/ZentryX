
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

const HTMLEntityEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { toast } = useToast();

  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  const encodeHtml = (text: string) => {
    return text.replace(/[&<>"'`=\/]/g, (s) => htmlEntities[s] || s);
  };

  const decodeHtml = (text: string) => {
    const reverseEntities: { [key: string]: string } = {};
    Object.keys(htmlEntities).forEach(key => {
      reverseEntities[htmlEntities[key]] = key;
    });
    
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&#x60;/g, '`')
      .replace(/&#x3D;/g, '=')
      .replace(/&nbsp;/g, ' ')
      .replace(/&copy;/g, '©')
      .replace(/&reg;/g, '®')
      .replace(/&trade;/g, '™');
  };

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive"
      });
      return;
    }

    const result = mode === "encode" ? encodeHtml(input) : decodeHtml(input);
    setOutput(result);
    
    toast({
      title: "Success",
      description: `Text ${mode}d successfully`
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard"
    });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">HTML Entity Encoder/Decoder</CardTitle>
          <CardDescription>
            Encode HTML special characters to entities or decode HTML entities back to characters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <div className="flex space-x-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              onClick={() => setMode("encode")}
              className="flex-1"
            >
              Encode to Entities
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              onClick={() => setMode("decode")}
              className="flex-1"
            >
              Decode from Entities
            </Button>
          </div>

          {/* Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === "encode" ? "Text to Encode" : "HTML Entities to Decode"}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? 'Enter text like: <script>alert("Hello")</script>' : 'Enter HTML entities like: &lt;script&gt;alert(&quot;Hello&quot;)&lt;/script&gt;'}
              className="min-h-32"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button 
              onClick={handleProcess} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {mode === "encode" ? "Encode HTML" : "Decode HTML"}
            </Button>
            <Button variant="outline" onClick={clearAll}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Output */}
          {output && (
            <div>
              <label className="block text-sm font-medium mb-2">
                {mode === "encode" ? "Encoded HTML Entities" : "Decoded Text"}
              </label>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-32 bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(output)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Common HTML Entities Reference */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg">Common HTML Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><code>&amp;</code> → <code>&amp;amp;</code></div>
            <div><code>&lt;</code> → <code>&amp;lt;</code></div>
            <div><code>&gt;</code> → <code>&amp;gt;</code></div>
            <div><code>"</code> → <code>&amp;quot;</code></div>
            <div><code>'</code> → <code>&amp;#x27;</code></div>
            <div><code>/</code> → <code>&amp;#x2F;</code></div>
            <div><code>©</code> → <code>&amp;copy;</code></div>
            <div><code>®</code> → <code>&amp;reg;</code></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HTMLEntityEncoder;
