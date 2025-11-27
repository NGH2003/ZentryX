import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const JWTDecoder = () => {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState<object | null>(null);
    const [payload, setPayload] = useState<object | null>(null);
    const [error, setError] = useState("");

    const decodeJWT = (input: string) => {
        setError("");
        setHeader(null);
        setPayload(null);

        if (!input) return;

        try {
            const parts = input.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format. A JWT must have 3 parts separated by dots.");
            }

            const decodePart = (part: string) => {
                const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            };

            const decodedHeader = decodePart(parts[0]);
            const decodedPayload = decodePart(parts[1]);

            setHeader(decodedHeader);
            setPayload(decodedPayload);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to decode JWT");
        }
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setToken(val);
        decodeJWT(val);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>JWT Token Input</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Paste your JWT token here (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                        value={token}
                        onChange={handleTokenChange}
                        className="min-h-[120px] font-mono text-sm"
                    />
                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {!error && payload && (
                        <Alert className="mt-4 bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Valid Format</AlertTitle>
                            <AlertDescription className="text-green-700">Token structure is correct.</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Header</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-auto max-h-[400px] text-sm font-mono">
                            {header ? JSON.stringify(header, null, 2) : "// Header will appear here"}
                        </pre>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-auto max-h-[400px] text-sm font-mono">
                            {payload ? JSON.stringify(payload, null, 2) : "// Payload will appear here"}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default JWTDecoder;
