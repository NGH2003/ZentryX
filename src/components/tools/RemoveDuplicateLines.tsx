
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const RemoveDuplicateLines = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive"
      });
      return;
    }

    const lines = inputText.split('\n');
    const uniqueLines = [...new Set(lines)];
    const result = uniqueLines.join('\n');
    setOutputText(result);

    toast({
      title: "Success!",
      description: `Removed ${lines.length - uniqueLines.length} duplicate lines`
    });
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
          <CardTitle className="text-2xl">Remove Duplicate Lines</CardTitle>
          <CardDescription>
            Remove duplicate lines from your text while preserving the original order
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
              placeholder="Enter text with duplicate lines..."
              className="min-h-32"
            />
          </div>

          <Button onClick={removeDuplicates} className="w-full">
            Remove Duplicates
          </Button>

          {outputText && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Output (Unique Lines):
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

export default RemoveDuplicateLines;
