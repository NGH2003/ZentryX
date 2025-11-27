import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonCsvConverter = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [csvInput, setCsvInput] = useState("");
    const { toast } = useToast();

    const jsonToCsv = () => {
        try {
            const data = JSON.parse(jsonInput);
            const array = Array.isArray(data) ? data : [data];

            if (array.length === 0) {
                setCsvInput("");
                return;
            }

            const headers = Object.keys(array[0]);
            const csvRows = [headers.join(',')];

            for (const row of array) {
                const values = headers.map(header => {
                    const val = row[header];
                    const escaped = ('' + val).replace(/"/g, '\\"');
                    return `"${escaped}"`;
                });
                csvRows.push(values.join(','));
            }

            setCsvInput(csvRows.join('\n'));
            toast({ title: "Converted JSON to CSV" });
        } catch (e) {
            toast({ title: "Invalid JSON", variant: "destructive" });
        }
    };

    const csvToJson = () => {
        try {
            const lines = csvInput.trim().split('\n');
            if (lines.length < 2) return;

            const headers = lines[0].split(',').map(h => h.trim());
            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const obj: any = {};
                // Simple CSV parsing (doesn't handle commas inside quotes perfectly)
                const currentline = lines[i].split(',');

                for (let j = 0; j < headers.length; j++) {
                    let val = currentline[j]?.trim();
                    if (val && val.startsWith('"') && val.endsWith('"')) {
                        val = val.substring(1, val.length - 1).replace(/\\"/g, '"');
                    }
                    obj[headers[j]] = val;
                }
                result.push(obj);
            }

            setJsonInput(JSON.stringify(result, null, 2));
            toast({ title: "Converted CSV to JSON" });
        } catch (e) {
            toast({ title: "Error parsing CSV", variant: "destructive" });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard" });
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>JSON</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        <Textarea
                            placeholder='[{"name": "John", "age": 30}, ...]'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            className="flex-1 min-h-[300px] font-mono text-xs"
                        />
                        <div className="flex gap-2">
                            <Button onClick={jsonToCsv} className="flex-1">
                                Convert to CSV <ArrowDown className="ml-2 w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(jsonInput)}>
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>CSV</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        <Textarea
                            placeholder="name,age&#10;John,30"
                            value={csvInput}
                            onChange={(e) => setCsvInput(e.target.value)}
                            className="flex-1 min-h-[300px] font-mono text-xs"
                        />
                        <div className="flex gap-2">
                            <Button onClick={csvToJson} className="flex-1" variant="secondary">
                                Convert to JSON <ArrowUp className="ml-2 w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(csvInput)}>
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default JsonCsvConverter;
