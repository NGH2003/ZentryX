import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const RegexTester = () => {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("gm");
    const [text, setText] = useState("The quick brown fox jumps over the lazy dog.\nEmail: test@example.com\nPhone: 123-456-7890");

    const { matches, error, highlightedText } = useMemo(() => {
        if (!pattern) return { matches: [], error: null, highlightedText: text };

        try {
            const regex = new RegExp(pattern, flags);
            const matchesArray = Array.from(text.matchAll(regex));

            // Create highlighted text
            let lastIndex = 0;
            const parts = [];

            // We need to handle global vs non-global carefully.
            // matchAll works for global. If not global, it returns one match with index.

            // If regex is valid but empty string match (e.g. ^), be careful of infinite loops if we were doing manual loop.
            // matchAll handles it.

            matchesArray.forEach((match, i) => {
                const start = match.index!;
                const end = start + match[0].length;

                // Add text before match
                if (start > lastIndex) {
                    parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, start)}</span>);
                }

                // Add match
                parts.push(
                    <span key={`match-${i}`} className="bg-yellow-200 dark:bg-yellow-900 rounded px-0.5 border border-yellow-300 dark:border-yellow-700">
                        {match[0]}
                    </span>
                );

                lastIndex = end;
            });

            // Add remaining text
            if (lastIndex < text.length) {
                parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
            }

            return { matches: matchesArray, error: null, highlightedText: parts };
        } catch (e) {
            return { matches: [], error: (e as Error).message, highlightedText: text };
        }
    }, [pattern, flags, text]);

    const toggleFlag = (flag: string) => {
        if (flags.includes(flag)) {
            setFlags(flags.replace(flag, ""));
        } else {
            setFlags(flags + flag);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Regex Tester</CardTitle>
                    <CardDescription>Test and debug regular expressions in real-time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="flex-1 space-y-2">
                                <Label>Regular Expression</Label>
                                <div className="flex items-center gap-2 font-mono text-lg bg-muted p-2 rounded-md border">
                                    <span className="text-muted-foreground">/</span>
                                    <input
                                        type="text"
                                        value={pattern}
                                        onChange={(e) => setPattern(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none"
                                        placeholder="e.g. [a-z]+"
                                    />
                                    <span className="text-muted-foreground">/</span>
                                    <input
                                        type="text"
                                        value={flags}
                                        onChange={(e) => setFlags(e.target.value)}
                                        className="w-16 bg-transparent border-none outline-none text-muted-foreground"
                                        placeholder="flags"
                                    />
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="flag-g" checked={flags.includes("g")} onCheckedChange={() => toggleFlag("g")} />
                                <Label htmlFor="flag-g">Global (g)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="flag-i" checked={flags.includes("i")} onCheckedChange={() => toggleFlag("i")} />
                                <Label htmlFor="flag-i">Case Insensitive (i)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="flag-m" checked={flags.includes("m")} onCheckedChange={() => toggleFlag("m")} />
                                <Label htmlFor="flag-m">Multiline (m)</Label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Test String</Label>
                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={10}
                                    className="font-mono"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Match Preview</Label>
                                <div className="h-[250px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background overflow-auto whitespace-pre-wrap font-mono">
                                    {highlightedText}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Found {matches.length} matches
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegexTester;
