import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UnixTimestampConverter = () => {
    const [timestamp, setTimestamp] = useState<string>("");
    const [dateString, setDateString] = useState<string>("");
    const [humanDate, setHumanDate] = useState<string>("");
    const { toast } = useToast();

    // Initialize with current time
    useEffect(() => {
        const now = Math.floor(Date.now() / 1000);
        setTimestamp(now.toString());
        convertTimestamp(now.toString());
    }, []);

    const convertTimestamp = (ts: string) => {
        if (!ts) {
            setHumanDate("");
            return;
        }
        const date = new Date(parseInt(ts) * 1000);
        if (isNaN(date.getTime())) {
            setHumanDate("Invalid Timestamp");
        } else {
            setHumanDate(date.toUTCString() + " / " + date.toLocaleString());
        }
    };

    const convertDate = (dateStr: string) => {
        if (!dateStr) {
            setTimestamp("");
            return;
        }
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            setTimestamp("Invalid Date");
        } else {
            setTimestamp(Math.floor(date.getTime() / 1000).toString());
        }
    };

    const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTimestamp(val);
        convertTimestamp(val);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDateString(val);
        convertDate(val);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Copied to clipboard",
        });
    };

    const refreshCurrent = () => {
        const now = Math.floor(Date.now() / 1000);
        setTimestamp(now.toString());
        convertTimestamp(now.toString());
        setDateString(new Date().toISOString().slice(0, 16));
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Unix Timestamp Converter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={refreshCurrent}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Current Time
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="timestamp">Unix Timestamp (Seconds)</Label>
                        <div className="flex gap-2">
                            <Input
                                id="timestamp"
                                value={timestamp}
                                onChange={handleTimestampChange}
                                placeholder="e.g. 1678900000"
                            />
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(timestamp)}>
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-100 rounded-md text-center font-mono">
                        {humanDate || "Enter a timestamp above"}
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or convert date to timestamp
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date-input">Date & Time</Label>
                        <Input
                            id="date-input"
                            type="datetime-local"
                            value={dateString}
                            onChange={handleDateChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">What is a Unix Timestamp?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">
                        The Unix timestamp is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970 at UTC. Therefore, the Unix time stamp is merely the number of seconds between a particular date and the Unix Epoch.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default UnixTimestampConverter;
