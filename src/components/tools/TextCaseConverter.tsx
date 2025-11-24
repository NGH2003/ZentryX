
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const convertCase = (caseType: string) => {
    let result = "";
    switch (caseType) {
      case "uppercase":
        result = inputText.toUpperCase();
        break;
      case "lowercase":
        result = inputText.toLowerCase();
        break;
      case "capitalize":
        result = inputText.replace(/\b\w/g, l => l.toUpperCase());
        break;
      case "sentence":
        result = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
        break;
      default:
        result = inputText;
    }
    
    navigator.clipboard.writeText(result);
    toast({
      title: "Converted & Copied!",
      description: `Text converted to ${caseType} and copied to clipboard`
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Text Case Converter</CardTitle>
          <CardDescription>
            Convert text between different cases instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter your text:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-32"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={() => convertCase("uppercase")} variant="outline">
              UPPERCASE
            </Button>
            <Button onClick={() => convertCase("lowercase")} variant="outline">
              lowercase
            </Button>
            <Button onClick={() => convertCase("capitalize")} variant="outline">
              Capitalize Each Word
            </Button>
            <Button onClick={() => convertCase("sentence")} variant="outline">
              Sentence case
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextCaseConverter;
