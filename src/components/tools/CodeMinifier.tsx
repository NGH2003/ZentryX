import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, FileCode } from "lucide-react";

const CodeMinifier = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("html");
    const { toast } = useToast();

    const minify = () => {
        let result = input;

        if (language === "html") {
            result = result
                .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
                .replace(/\s+/g, " ") // Collapse whitespace
                .replace(/>\s+</g, "><") // Remove whitespace between tags
                .trim();
        } else if (language === "css") {
            result = result
                .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
                .replace(/\s+/g, " ") // Collapse whitespace
                .replace(/\s*([{}:;,])\s*/g, "$1") // Remove whitespace around separators
                .replace(/;}/g, "}") // Remove last semicolon
                .trim();
        } else if (language === "js") {
            // Basic JS minification (Safe-ish)
            result = result
                .replace(/\/\*[\s\S]*?\*\//g, "") // Remove block comments
                .replace(/\/\/.*/g, "") // Remove line comments
                .replace(/\s+/g, " ") // Collapse whitespace
                .replace(/\s*([{}:;,=()<>!&|])\s*/g, "$1") // Remove whitespace around operators
                .trim();
        }

        setOutput(result);
        toast({
            title: "Minified!",
            description: `Code minified successfully. Saved ${(input.length - result.length)} bytes.`,
        });
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast({ title: "Copied!", description: "Minified code copied to clipboard" });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Code Minifier</CardTitle>
                    <CardDescription>Minify HTML, CSS, and JavaScript to reduce file size</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="css">CSS</SelectItem>
                                <SelectItem value="js">JavaScript (Basic)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Input Code</Label>
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                rows={12}
                                className="font-mono text-sm"
                                placeholder={`Paste your ${language.toUpperCase()} code here...`}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Minified Output</Label>
                            <Textarea
                                value={output}
                                readOnly
                                rows={12}
                                className="font-mono text-sm bg-muted"
                                placeholder="Minified code will appear here..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={minify} className="flex-1" size="lg">
                            <FileCode className="w-4 h-4 mr-2" />
                            Minify Code
                        </Button>
                        <Button onClick={copyToClipboard} variant="outline" size="lg" disabled={!output}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CodeMinifier;
