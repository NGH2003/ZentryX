import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const generatePassword = () => {
    // Character sets
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    let requiredChars = [];

    // Build charset and ensure at least one of each selected type
    if (includeUppercase) {
      charset += uppercase;
      requiredChars.push(uppercase[getSecureRandomInt(uppercase.length)]);
    }
    if (includeLowercase) {
      charset += lowercase;
      requiredChars.push(lowercase[getSecureRandomInt(lowercase.length)]);
    }
    if (includeNumbers) {
      charset += numbers;
      requiredChars.push(numbers[getSecureRandomInt(numbers.length)]);
    }
    if (includeSymbols) {
      charset += symbols;
      requiredChars.push(symbols[getSecureRandomInt(symbols.length)]);
    }

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    // Validate length
    const validatedLength = Math.max(4, Math.min(128, length));

    // Generate remaining characters
    let generatedPassword = [...requiredChars];
    for (let i = requiredChars.length; i < validatedLength; i++) {
      generatedPassword.push(charset[getSecureRandomInt(charset.length)]);
    }

    // Shuffle password using Fisher-Yates algorithm with secure random
    for (let i = generatedPassword.length - 1; i > 0; i--) {
      const j = getSecureRandomInt(i + 1);
      [generatedPassword[i], generatedPassword[j]] = [generatedPassword[j], generatedPassword[i]];
    }

    const finalPassword = generatedPassword.join("");
    setPassword(finalPassword);
    
    toast({
      title: "Generated!",
      description: "Secure password generated successfully"
    });
  };

  // Cryptographically secure random integer generation
  const getSecureRandomInt = (max: number): number => {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
  };

  const copyToClipboard = () => {
    if (!password) return;
    
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    });
  };

  const calculateStrength = () => {
    if (!password) return { strength: "", color: "" };
    
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: "Weak", color: "text-red-500" };
    if (score <= 4) return { strength: "Medium", color: "text-yellow-500" };
    return { strength: "Strong", color: "text-green-500" };
  };

  const strength = calculateStrength();

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Password Generator</CardTitle>
          <CardDescription>
            Generate cryptographically secure passwords with customizable options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base">Password Length: {length}</Label>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={4}
                max={128}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(!!checked)}
                />
                <Label htmlFor="uppercase" className="cursor-pointer">
                  Include Uppercase Letters (A-Z)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(!!checked)}
                />
                <Label htmlFor="lowercase" className="cursor-pointer">
                  Include Lowercase Letters (a-z)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(!!checked)}
                />
                <Label htmlFor="numbers" className="cursor-pointer">
                  Include Numbers (0-9)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(!!checked)}
                />
                <Label htmlFor="symbols" className="cursor-pointer">
                  Include Symbols (!@#$%^&*)
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full" size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Secure Password
          </Button>

          {password && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <Label className="text-sm text-muted-foreground">Generated Password</Label>
                  {strength.strength && (
                    <span className={`text-sm font-semibold ${strength.color}`}>
                      {strength.strength}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-base"
                  />
                  <Button onClick={copyToClipboard} variant="outline" size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>✓ Uses cryptographically secure random generation</p>
                <p>✓ Includes at least one character from each selected type</p>
                <p>✓ Properly shuffled for maximum entropy</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
