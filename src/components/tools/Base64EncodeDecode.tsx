
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const Base64EncodeDecode = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  const processText = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive"
      });
      return;
    }

    try {
      let result = "";
      if (mode === 'encode') {
        result = btoa(inputText);
      } else {
        result = atob(inputText);
      }
      setOutputText(result);
      toast({
        title: "Success!",
        description: `Text ${mode}d successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for Base64 decoding",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Base64 Encode/Decode</CardTitle>
          <CardDescription>
            Encode and decode text using Base64 encoding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            <Button 
              variant={mode === 'encode' ? 'default' : 'outline'}
              onClick={() => setMode('encode')}
            >
              Encode
            </Button>
            <Button 
              variant={mode === 'decode' ? 'default' : 'outline'}
              onClick={() => setMode('decode')}
            >
              Decode
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Input Text:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 to decode..."}
              className="min-h-32"
            />
          </div>

          <Button onClick={processText} className="w-full">
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>

          {outputText && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  {mode === 'encode' ? 'Encoded' : 'Decoded'} Text:
                </label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={outputText}
                readOnly
                className="min-h-32 bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Base64EncodeDecode;
