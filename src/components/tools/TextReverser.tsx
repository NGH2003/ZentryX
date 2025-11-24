
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const TextReverser = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const reverseText = (type: 'characters' | 'words' | 'lines') => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive"
      });
      return;
    }

    let result = "";
    switch (type) {
      case 'characters':
        result = inputText.split('').reverse().join('');
        break;
      case 'words':
        result = inputText.split(' ').reverse().join(' ');
        break;
      case 'lines':
        result = inputText.split('\n').reverse().join('\n');
        break;
    }

    setOutputText(result);
    toast({
      title: "Success!",
      description: `Text reversed by ${type}`
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Reversed text copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Text Reverser</CardTitle>
          <CardDescription>
            Reverse text by characters, words, or lines
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
              placeholder="Enter text to reverse..."
              className="min-h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button onClick={() => reverseText('characters')} variant="outline">
              Reverse Characters
            </Button>
            <Button onClick={() => reverseText('words')} variant="outline">
              Reverse Words
            </Button>
            <Button onClick={() => reverseText('lines')} variant="outline">
              Reverse Lines
            </Button>
          </div>

          {outputText && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Reversed Text:
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

export default TextReverser;
