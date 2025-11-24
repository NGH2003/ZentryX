import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PrimeChecker = () => {
  const [number, setNumber] = useState("");
  const [isPrime, setIsPrime] = useState<boolean | null>(null);
  const [factors, setFactors] = useState<number[]>([]);

  const checkPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const getFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) {
          factors.push(n / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const handleCheck = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      setIsPrime(null);
      setFactors([]);
      return;
    }

    setIsPrime(checkPrime(num));
    setFactors(getFactors(num));
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Prime Number Checker</CardTitle>
          <CardDescription>Check if a number is prime and see its factors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter Number</label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter a number"
            />
          </div>

          <Button onClick={handleCheck} className="w-full">Check Prime</Button>

          {isPrime !== null && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-lg mb-2">
                  {number} is {isPrime ? "" : "NOT"} a prime number
                </p>
                <Badge variant={isPrime ? "default" : "secondary"} className="text-lg px-4 py-2">
                  {isPrime ? "Prime" : "Composite"}
                </Badge>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Factors:</label>
                <div className="flex flex-wrap gap-2">
                  {factors.map((factor) => (
                    <Badge key={factor} variant="outline">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrimeChecker;
