import { useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const OpenGraphPreview = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const generateOGTags = () => {
    let tags = "";
    if (title) tags += `<meta property="og:title" content="${title}">\n`;
    if (description) tags += `<meta property="og:description" content="${description}">\n`;
    if (image) tags += `<meta property="og:image" content="${image}">\n`;
    if (url) tags += `<meta property="og:url" content="${url}">\n`;
    tags += `<meta property="og:type" content="website">`;
    return tags;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateOGTags());
    toast({
      title: "Copied!",
      description: "Open Graph tags copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Open Graph Preview</CardTitle>
          <CardDescription>Generate and preview Open Graph meta tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Page URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          {(title || description) && (
            <div className="p-4 border border-gray-300 rounded-lg bg-white">
              <p className="text-xs text-gray-500 mb-2">Preview</p>
              {image && (
                <div className="mb-2 bg-gray-200 h-40 rounded flex items-center justify-center">
                  <img src={image} alt="Preview" className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <p className="font-semibold text-blue-600 mb-1">{title || "Title"}</p>
              <p className="text-sm text-gray-600 mb-1">{description || "Description"}</p>
              <p className="text-xs text-gray-500">{url || "https://example.com"}</p>
            </div>
          )}

          {(title || description || image || url) && (
            <div>
              <label className="block text-sm font-medium mb-2">Generated Tags</label>
              <div className="relative">
                <Textarea
                  value={generateOGTags()}
                  readOnly
                  rows={6}
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

export default OpenGraphPreview;
