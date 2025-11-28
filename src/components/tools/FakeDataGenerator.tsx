import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, Download } from "lucide-react";

const FakeDataGenerator = () => {
    const [count, setCount] = useState(5);
    const [type, setType] = useState("all");
    const [data, setData] = useState<any[]>([]);
    const { toast } = useToast();

    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com", "test.org"];
    const streets = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine St", "Washington Blvd", "Lakeview Dr", "Park Ave", "Sunset Blvd", "Broadway"];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
    const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"];

    const generateData = () => {
        const newData = [];
        for (let i = 0; i < count; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`;
            const address = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}, ${states[Math.floor(Math.random() * states.length)]}`;
            const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

            let item: any = {};
            if (type === "all" || type === "name") item.name = `${firstName} ${lastName}`;
            if (type === "all" || type === "email") item.email = email;
            if (type === "all" || type === "address") item.address = address;
            if (type === "all" || type === "phone") item.phone = phone;

            newData.push(item);
        }
        setData(newData);
        toast({
            title: "Generated!",
            description: `Generated ${count} fake data entries`,
        });
    };

    const copyToClipboard = () => {
        if (data.length === 0) return;
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        toast({
            title: "Copied!",
            description: "Data copied to clipboard as JSON",
        });
    };

    const downloadJSON = () => {
        if (data.length === 0) return;
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "fake_data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Fake Data Generator</CardTitle>
                    <CardDescription>Generate random user data for testing and development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Number of Entries</Label>
                            <Input
                                type="number"
                                min={1}
                                max={100}
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Data Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Fields</SelectItem>
                                    <SelectItem value="name">Names Only</SelectItem>
                                    <SelectItem value="email">Emails Only</SelectItem>
                                    <SelectItem value="address">Addresses Only</SelectItem>
                                    <SelectItem value="phone">Phone Numbers Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button onClick={generateData} className="w-full" size="lg">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate Data
                    </Button>

                    {data.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex justify-end gap-2">
                                <Button onClick={copyToClipboard} variant="outline" size="sm">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy JSON
                                </Button>
                                <Button onClick={downloadJSON} variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download JSON
                                </Button>
                            </div>
                            <div className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                                <pre className="text-sm font-mono">{JSON.stringify(data, null, 2)}</pre>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default FakeDataGenerator;
