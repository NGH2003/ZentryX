import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextColumnSplitter = () => {
    const [input, setInput] = useState("");
    const [delimiter, setDelimiter] = useState(",");
    const [customDelimiter, setCustomDelimiter] = useState("|");
    const [columns, setColumns] = useState<string[][]>([]);
    const { toast } = useToast();

    const splitText = () => {
        const sep = delimiter === "custom" ? customDelimiter : delimiter;
        const lines = input.split("\n");
        const cols: string[][] = [];

        lines.forEach(line => {
            if (!line.trim()) return;
            const parts = line.split(sep);
            parts.forEach((part, i) => {
                if (!cols[i]) cols[i] = [];
                cols[i].push(part.trim());
            });
        });

        setColumns(cols);
    };

    const copyColumn = (colIndex: number) => {
        const text = columns[colIndex].join("\n");
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: `Column ${colIndex + 1} copied to clipboard` });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Text Column Splitter</CardTitle>
                    <CardDescription>Split structured text into separate columns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Delimiter</Label>
                            <Select value={delimiter} onValueChange={setDelimiter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select delimiter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=",">Comma (,)</SelectItem>
                                    <SelectItem value="\t">Tab</SelectItem>
                                    <SelectItem value=" ">Space</SelectItem>
                                    <SelectItem value=";">Semicolon (;)</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {delimiter === "custom" && (
                            <div className="space-y-2">
                                <Label>Custom Delimiter</Label>
                                <Input value={customDelimiter} onChange={(e) => setCustomDelimiter(e.target.value)} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Input Text</Label>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={6}
                            placeholder="Paste your text here (e.g. CSV data)..."
                            className="font-mono"
                        />
                    </div>

                    <Button onClick={splitText} className="w-full">Split Columns</Button>

                    {columns.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {columns.map((col, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Column {i + 1} ({col.length} items)</Label>
                                        <Button variant="ghost" size="sm" onClick={() => copyColumn(i)}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={col.join("\n")}
                                        readOnly
                                        rows={10}
                                        className="font-mono bg-muted"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TextColumnSplitter;
