
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PercentageCalculator = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [percentage, setPercentage] = useState("");
  const [results, setResults] = useState<any>({});
  const { toast } = useToast();

  const calculatePercentage = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    
    if (isNaN(num1) || isNaN(num2)) {
      toast({
        title: "Error",
        description: "Please enter valid numbers",
        variant: "destructive"
      });
      return;
    }

    const percentageOf = (num1 / num2) * 100;
    const percentageChange = ((num2 - num1) / num1) * 100;
    const increase = num1 * (1 + num2 / 100);
    const decrease = num1 * (1 - num2 / 100);

    setResults({
      percentageOf: percentageOf.toFixed(2),
      percentageChange: percentageChange.toFixed(2),
      increase: increase.toFixed(2),
      decrease: decrease.toFixed(2)
    });

    toast({
      title: "Calculated!",
      description: "All percentage calculations completed"
    });
  };

  const calculatePercentageOf = () => {
    const num = parseFloat(value1);
    const percent = parseFloat(percentage);
    
    if (isNaN(num) || isNaN(percent)) {
      toast({
        title: "Error",
        description: "Please enter valid numbers",
        variant: "destructive"
      });
      return;
    }

    const result = (percent / 100) * num;
    setResults({ ...results, percentageOfValue: result.toFixed(2) });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Percentage Calculator</CardTitle>
          <CardDescription>
            Calculate percentages and percentage changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Value 1:</label>
              <Input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="Enter first value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Value 2:</label>
              <Input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Enter second value"
              />
            </div>
          </div>

          <Button onClick={calculatePercentage} className="w-full">
            Calculate Percentages
          </Button>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Percentage of a Number</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Number:</label>
                <Input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Percentage:</label>
                <Input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="Enter percentage"
                />
              </div>
            </div>
            <Button onClick={calculatePercentageOf} className="w-full mt-4" variant="outline">
              Calculate Percentage Of
            </Button>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Results:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.percentageOf && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">What % is {value1} of {value2}?</div>
                    <div className="text-2xl font-bold text-blue-600">{results.percentageOf}%</div>
                  </div>
                )}
                {results.percentageChange && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">% Change from {value1} to {value2}</div>
                    <div className="text-2xl font-bold text-green-600">{results.percentageChange}%</div>
                  </div>
                )}
                {results.percentageOfValue && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600">{percentage}% of {value1}</div>
                    <div className="text-2xl font-bold text-purple-600">{results.percentageOfValue}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentageCalculator;
