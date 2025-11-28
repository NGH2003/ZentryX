import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Search } from "lucide-react";

const CsvViewer = () => {
    const [data, setData] = useState<string[][]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                parseCSV(text);
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = (text: string) => {
        // Simple CSV parser handling quotes
        const rows: string[][] = [];
        let currentRow: string[] = [];
        let currentCell = "";
        let insideQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (insideQuotes && nextChar === '"') {
                    currentCell += '"';
                    i++;
                } else {
                    insideQuotes = !insideQuotes;
                }
            } else if (char === ',' && !insideQuotes) {
                currentRow.push(currentCell);
                currentCell = "";
            } else if ((char === '\r' || char === '\n') && !insideQuotes) {
                if (char === '\r' && nextChar === '\n') i++;
                currentRow.push(currentCell);
                rows.push(currentRow);
                currentRow = [];
                currentCell = "";
            } else {
                currentCell += char;
            }
        }
        if (currentCell || currentRow.length > 0) {
            currentRow.push(currentCell);
            rows.push(currentRow);
        }

        if (rows.length > 0) {
            setHeaders(rows[0]);
            setData(rows.slice(1));
        }
    };

    const filteredData = data.filter(row =>
        row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">CSV Viewer</CardTitle>
                    <CardDescription>View and search CSV files instantly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {headers.length === 0 ? (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="csv-upload"
                            />
                            <Label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <Upload className="w-12 h-12 text-muted-foreground" />
                                <span className="text-lg font-medium">Click to upload CSV file</span>
                            </Label>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search data..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                                <Button variant="outline" onClick={() => { setHeaders([]); setData([]); }}>
                                    Upload New File
                                </Button>
                            </div>

                            <div className="border rounded-lg overflow-auto max-h-[600px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {headers.map((header, i) => (
                                                <TableHead key={i} className="whitespace-nowrap font-bold">
                                                    {header}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((row, i) => (
                                                <TableRow key={i}>
                                                    {row.map((cell, j) => (
                                                        <TableCell key={j} className="whitespace-nowrap">
                                                            {cell}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={headers.length} className="text-center h-24">
                                                    No results found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Showing {filteredData.length} of {data.length} rows
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CsvViewer;
