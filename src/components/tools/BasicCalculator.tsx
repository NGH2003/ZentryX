
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForValue, setWaitingForValue] = useState(false);
  const { toast } = useToast();

  const inputNumber = (num: string) => {
    if (waitingForValue) {
      setDisplay(num);
      setWaitingForValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForValue(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Basic Calculator</CardTitle>
          <CardDescription>
            Perform basic arithmetic operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="bg-gray-900 text-white p-4 rounded-lg text-right text-2xl font-mono cursor-pointer"
            onClick={copyResult}
            title="Click to copy"
          >
            {display}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={clear} className="col-span-2">Clear</Button>
            <Button variant="outline" onClick={() => inputOperation("÷")}>÷</Button>
            <Button variant="outline" onClick={() => inputOperation("×")}>×</Button>

            <Button variant="outline" onClick={() => inputNumber("7")}>7</Button>
            <Button variant="outline" onClick={() => inputNumber("8")}>8</Button>
            <Button variant="outline" onClick={() => inputNumber("9")}>9</Button>
            <Button variant="outline" onClick={() => inputOperation("-")}>-</Button>

            <Button variant="outline" onClick={() => inputNumber("4")}>4</Button>
            <Button variant="outline" onClick={() => inputNumber("5")}>5</Button>
            <Button variant="outline" onClick={() => inputNumber("6")}>6</Button>
            <Button variant="outline" onClick={() => inputOperation("+")}>+</Button>

            <Button variant="outline" onClick={() => inputNumber("1")}>1</Button>
            <Button variant="outline" onClick={() => inputNumber("2")}>2</Button>
            <Button variant="outline" onClick={() => inputNumber("3")}>3</Button>
            <Button variant="default" onClick={performCalculation} className="row-span-2">=</Button>

            <Button variant="outline" onClick={() => inputNumber("0")} className="col-span-2">0</Button>
            <Button variant="outline" onClick={() => inputNumber(".")}>.</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicCalculator;
