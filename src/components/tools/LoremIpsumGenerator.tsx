
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const LoremIpsumGenerator = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
    "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
    "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
    "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const generateLorem = () => {
    const result = [];
    
    for (let i = 0; i < paragraphs; i++) {
      const paragraph = [];
      for (let j = 0; j < wordsPerParagraph; j++) {
        const word = loremWords[Math.floor(Math.random() * loremWords.length)];
        paragraph.push(j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
      }
      result.push(paragraph.join(' ') + '.');
    }
    
    setOutputText(result.join('\n\n'));
    toast({
      title: "Generated!",
      description: `Created ${paragraphs} paragraphs of Lorem Ipsum text`
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Lorem Ipsum text copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Lorem Ipsum Generator</CardTitle>
          <CardDescription>
            Generate placeholder text for your designs and prototypes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Paragraphs:
              </label>
              <Input
                type="number"
                value={paragraphs}
                onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Words per Paragraph:
              </label>
              <Input
                type="number"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(Math.max(10, parseInt(e.target.value) || 50))}
                min="10"
                max="200"
              />
            </div>
          </div>

          <Button onClick={generateLorem} className="w-full">
            Generate Lorem Ipsum
          </Button>

          {outputText && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Generated Text:
                </label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={outputText}
                readOnly
                className="min-h-48 bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoremIpsumGenerator;
