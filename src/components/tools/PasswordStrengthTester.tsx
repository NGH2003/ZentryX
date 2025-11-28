import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, Check, X } from "lucide-react";

const PasswordStrengthTester = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const calculateStrength = (pwd: string) => {
        if (!pwd) return { score: 0, label: "Empty", color: "bg-gray-200" };

        let score = 0;
        if (pwd.length >= 8) score += 20;
        if (pwd.length >= 12) score += 10;
        if (/[A-Z]/.test(pwd)) score += 15;
        if (/[a-z]/.test(pwd)) score += 15;
        if (/[0-9]/.test(pwd)) score += 20;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

        if (score < 40) return { score, label: "Weak", color: "bg-red-500" };
        if (score < 70) return { score, label: "Medium", color: "bg-yellow-500" };
        if (score < 90) return { score, label: "Strong", color: "bg-green-500" };
        return { score, label: "Very Strong", color: "bg-emerald-600" };
    };

    const strength = calculateStrength(password);

    const checks = [
        { label: "At least 8 characters", valid: password.length >= 8 },
        { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", valid: /[a-z]/.test(password) },
        { label: "Contains number", valid: /[0-9]/.test(password) },
        { label: "Contains special character", valid: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Password Strength Tester</CardTitle>
                    <CardDescription>Check how secure your password is</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                                placeholder="Enter a password to test..."
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {password && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Strength: {strength.label}</span>
                                    <span>{strength.score}%</span>
                                </div>
                                <Progress value={strength.score} className={`h-2 ${strength.color}`} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {checks.map((check, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                        {check.valid ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <X className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className={check.valid ? "text-foreground" : "text-muted-foreground"}>
                                            {check.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PasswordStrengthTester;
