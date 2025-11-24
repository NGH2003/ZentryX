
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const JSONFormatter = () => {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const formatJSON = () => {
    if (!inputJson.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JSON",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setIsValid(true);
      toast({
        title: "Success!",
        description: "JSON formatted successfully"
      });
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Invalid JSON",
        description: "The JSON you entered is not valid",
        variant: "destructive"
      });
    }
  };

  const minifyJSON = () => {
    if (!inputJson.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JSON",
        variant: "destructive"
      });
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setIsValid(true);
      toast({
        title: "Success!",
        description: "JSON minified successfully"
      });
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Invalid JSON",
        description: "The JSON you entered is not valid",
        variant: "destructive"
      });
    }
  };

  const validateJSON = () => {
    if (!inputJson.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JSON",
        variant: "destructive"
      });
      return;
    }

    try {
      JSON.parse(inputJson);
      setIsValid(true);
      toast({
        title: "Valid JSON",
        description: "Your JSON is valid!"
      });
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Invalid JSON",
        description: "The JSON you entered is not valid",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputJson);
    toast({
      title: "Copied!",
      description: "Formatted JSON copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">JSON Formatter & Validator</CardTitle>
          <CardDescription>
            Format, minify, and validate JSON data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Input JSON:
            </label>
            <Textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste your JSON here..."
              className="min-h-48 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button onClick={formatJSON} variant="outline">
              Format JSON
            </Button>
            <Button onClick={minifyJSON} variant="outline">
              Minify JSON
            </Button>
            <Button onClick={validateJSON} variant="outline">
              Validate JSON
            </Button>
          </div>

          {isValid !== null && (
            <div className={`p-3 rounded-lg ${isValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
            </div>
          )}

          {outputJson && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Formatted JSON:
                </label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={outputJson}
                readOnly
                className="min-h-48 bg-gray-50 font-mono text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JSONFormatter;
