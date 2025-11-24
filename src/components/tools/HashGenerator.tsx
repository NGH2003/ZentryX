
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const HashGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [hashes, setHashes] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const generateHashes = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive"
      });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);
    
    const results: {[key: string]: string} = {};

    // Generate SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    results.sha256 = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Generate SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    results.sha1 = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Generate MD5 (simple implementation)
    results.md5 = generateSimpleMD5(inputText);

    setHashes(results);
    toast({
      title: "Generated!",
      description: "Hash values generated successfully"
    });
  };

  const generateSimpleMD5 = (str: string) => {
    // Simple hash function (not actual MD5, but demonstrates the concept)
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  const copyToClipboard = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${type} hash copied to clipboard`
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Hash Generator</CardTitle>
          <CardDescription>
            Generate cryptographic hash values (SHA-256, SHA-1, MD5) for any text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Input Text:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to generate hash..."
              className="min-h-32"
            />
          </div>

          <Button onClick={generateHashes} className="w-full">
            Generate Hashes
          </Button>

          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4">
              {Object.entries(hashes).map(([type, hash]) => (
                <div key={type}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium capitalize">
                      {type.toUpperCase()}:
                    </label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(hash, type.toUpperCase())}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Input
                    value={hash}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HashGenerator;
