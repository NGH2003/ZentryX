
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const { toast } = useToast();

  const generateNumbers = () => {
    if (min >= max) {
      toast({
        title: "Error",
        description: "Minimum value must be less than maximum value",
        variant: "destructive"
      });
      return;
    }

    // Validate input ranges
    const validatedMin = Math.max(-1000000, Math.min(1000000, min));
    const validatedMax = Math.max(-1000000, Math.min(1000000, max));
    const validatedCount = Math.max(1, Math.min(1000, count));

    const newNumbers = [];
    const range = validatedMax - validatedMin + 1;
    
    // Use cryptographically secure random number generation
    const randomBuffer = new Uint32Array(validatedCount);
    crypto.getRandomValues(randomBuffer);
    
    for (let i = 0; i < validatedCount; i++) {
      // Convert random value to range [min, max]
      const randomNum = validatedMin + (randomBuffer[i] % range);
      newNumbers.push(randomNum);
    }
    
    setNumbers(newNumbers);
    toast({
      title: "Generated!",
      description: `${validatedCount} cryptographically secure random number${validatedCount > 1 ? 's' : ''} generated`
    });
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: "Numbers copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Random Number Generator</CardTitle>
          <CardDescription>
            Generate random numbers within specified ranges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Minimum:</label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Maximum:</label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value) || 100)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Count:</label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                min="1"
                max="100"
              />
            </div>
          </div>

          <Button onClick={generateNumbers} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Random Numbers
          </Button>

          {numbers.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Generated Numbers ({numbers.length})</h3>
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(numbers.join(', '))}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {numbers.map((num, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-colors"
                    onClick={() => copyToClipboard(num.toString())}
                  >
                    <div className="font-bold text-lg">{num}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 text-center">
            Click on any number to copy it to clipboard
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RandomNumberGenerator;
