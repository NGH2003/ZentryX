
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Eye, Code } from "lucide-react";

const MarkdownToHTML = () => {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2\n- List item 3\n\n[Link to example](https://example.com)");
  const { toast } = useToast();

  // Simple markdown to HTML converter
  const convertMarkdownToHTML = (md: string) => {
    return md
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/__(.*?)__/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/_(.*?)_/gim, '<em>$1</em>')
      // Code
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" />')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li>$1</li>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr>')
      // Wrap in paragraphs
      .replace(/^(?!<[h|l|b|u|i])/gim, '<p>')
      .replace(/(?!<\/[h|l|b|u|i])$/gim, '</p>')
      // Clean up list items
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/<\/ul>\s*<ul>/g, '');
  };

  const htmlOutput = convertMarkdownToHTML(markdown);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "HTML copied to clipboard"
    });
  };

  const downloadHTML = () => {
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted from Markdown</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        blockquote { border-left: 4px solid #ddd; margin-left: 0; padding-left: 20px; }
        a { color: #0066cc; }
    </style>
</head>
<body>
    ${htmlOutput}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "HTML file downloaded successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Markdown to HTML Converter</CardTitle>
          <CardDescription>
            Convert Markdown text to HTML with live preview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Markdown Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Markdown Input</label>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Enter your Markdown here..."
                className="min-h-96 font-mono"
              />
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Output</label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(htmlOutput)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy HTML
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadHTML}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview" className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="html" className="flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    HTML
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview">
                  <div 
                    className="min-h-96 p-4 border rounded-lg bg-white prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlOutput }}
                  />
                </TabsContent>
                
                <TabsContent value="html">
                  <Textarea
                    value={htmlOutput}
                    readOnly
                    className="min-h-96 font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Markdown Cheat Sheet */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg">Markdown Cheat Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Headers</h4>
              <code># H1</code><br/>
              <code>## H2</code><br/>
              <code>### H3</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Text Formatting</h4>
              <code>**bold**</code><br/>
              <code>*italic*</code><br/>
              <code>`code`</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lists</h4>
              <code>- Item 1</code><br/>
              <code>- Item 2</code><br/>
              <code>1. Numbered</code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Links & Images</h4>
              <code>[Link](url)</code><br/>
              <code>![Image](url)</code><br/>
              <code>&gt; Blockquote</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarkdownToHTML;
