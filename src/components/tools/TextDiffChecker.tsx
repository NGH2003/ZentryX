import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TextDiffChecker = () => {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [diffResult, setDiffResult] = useState<JSX.Element[] | null>(null);

    const computeDiff = () => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLines = Math.max(lines1.length, lines2.length);
        const result: JSX.Element[] = [];

        for (let i = 0; i < maxLines; i++) {
            const line1 = lines1[i] || "";
            const line2 = lines2[i] || "";

            if (line1 === line2) {
                result.push(
                    <div key={i} className="flex border-b border-gray-100 last:border-0">
                        <div className="w-12 text-gray-400 text-xs p-1 select-none text-right bg-gray-50 border-r">{i + 1}</div>
                        <div className="flex-1 p-1 px-2 font-mono text-sm whitespace-pre-wrap">{line1}</div>
                    </div>
                );
            } else {
                if (line1) {
                    result.push(
                        <div key={`l1-${i}`} className="flex bg-red-50 border-b border-red-100">
                            <div className="w-12 text-red-400 text-xs p-1 select-none text-right bg-red-100/50 border-r border-red-200">{i + 1}</div>
                            <div className="flex-1 p-1 px-2 font-mono text-sm text-red-800 whitespace-pre-wrap">- {line1}</div>
                        </div>
                    );
                }
                if (line2) {
                    result.push(
                        <div key={`l2-${i}`} className="flex bg-green-50 border-b border-green-100">
                            <div className="w-12 text-green-400 text-xs p-1 select-none text-right bg-green-100/50 border-r border-green-200">{i + 1}</div>
                            <div className="flex-1 p-1 px-2 font-mono text-sm text-green-800 whitespace-pre-wrap">+ {line2}</div>
                        </div>
                    );
                }
            }
        }
        setDiffResult(result);
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Original Text</Label>
                    <Textarea
                        placeholder="Paste original text here..."
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        className="min-h-[200px] font-mono text-xs"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Modified Text</Label>
                    <Textarea
                        placeholder="Paste modified text here..."
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        className="min-h-[200px] font-mono text-xs"
                    />
                </div>
            </div>

            <Button onClick={computeDiff} className="w-full">Compare Text</Button>

            {diffResult && (
                <Card>
                    <CardHeader>
                        <CardTitle>Differences</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-hidden">
                        <div className="bg-white border rounded-md overflow-x-auto">
                            {diffResult.length > 0 ? diffResult : <div className="p-4 text-center text-gray-500">No differences found (or empty input)</div>}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TextDiffChecker;
