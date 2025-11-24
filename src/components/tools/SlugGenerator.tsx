import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SlugGenerator = () => {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const { toast } = useToast();

  const generateSlug = (text: string, sep: string) => {
    const generated = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, sep)
      .replace(new RegExp(`^${sep}+|${sep}+$`, "g"), "");

    setSlug(generated);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    generateSlug(value, separator);
  };

  const handleSeparatorChange = (value: string) => {
    setSeparator(value);
    generateSlug(input, value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    toast({
      title: "Copied!",
      description: "Slug copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Generate URL Slug</CardTitle>
          <CardDescription>
            Convert text into URL-friendly slugs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter text to convert to slug..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Separator</label>
            <Input
              value={separator}
              onChange={(e) => handleSeparatorChange(e.target.value)}
              placeholder="-"
              maxLength={1}
            />
          </div>

          {slug && (
            <div>
              <label className="block text-sm font-medium mb-2">Generated Slug</label>
              <div className="flex space-x-2">
                <Input
                  value={slug}
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
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

export default SlugGenerator;
