import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RobotsTxtGenerator = () => {
  const [sitemap, setSitemap] = useState("");
  const [disallowedPaths, setDisallowedPaths] = useState("");
  const { toast } = useToast();

  const generateRobotsTxt = () => {
    let content = "User-agent: *\n";

    if (disallowedPaths) {
      const paths = disallowedPaths.split('\n').filter(p => p.trim());
      paths.forEach(path => {
        content += `Disallow: ${path.trim()}\n`;
      });
    } else {
      content += "Disallow:\n";
    }

    content += "\n";

    if (sitemap) {
      content += `Sitemap: ${sitemap}`;
    }

    return content;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateRobotsTxt());
    toast({
      title: "Copied!",
      description: "Robots.txt content copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Robots.txt Generator</CardTitle>
          <CardDescription>Generate robots.txt file for your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sitemap URL</label>
            <Input
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Disallowed Paths (one per line)</label>
            <Textarea
              value={disallowedPaths}
              onChange={(e) => setDisallowedPaths(e.target.value)}
              placeholder="/admin/&#10;/private/&#10;/temp/"
              rows={5}
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to allow all paths</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Generated Robots.txt</label>
            <div className="relative">
              <Textarea
                value={generateRobotsTxt()}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RobotsTxtGenerator;
