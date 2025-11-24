import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (!w || !h || w <= 0 || h <= 0) return;

    const calculatedBMI = w / (h * h);
    setBmi(calculatedBMI);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "bg-blue-500", text: "You may need to gain weight" };
    if (bmi < 25) return { category: "Normal weight", color: "bg-green-500", text: "You have a healthy weight" };
    if (bmi < 30) return { category: "Overweight", color: "bg-yellow-500", text: "You may need to lose weight" };
    return { category: "Obese", color: "bg-red-500", text: "Consult a healthcare provider" };
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>Calculate your Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kilograms"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in centimeters"
              step="0.1"
            />
          </div>

          <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>

          {bmi !== null && (
            <div className="space-y-4">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Your BMI</p>
                <p className="text-5xl font-bold mb-4">{bmi.toFixed(1)}</p>
                <Badge className={`${getBMICategory(bmi).color} text-white text-lg px-4 py-2`}>
                  {getBMICategory(bmi).category}
                </Badge>
                <p className="text-sm text-gray-600 mt-4">{getBMICategory(bmi).text}</p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">BMI Categories:</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Underweight: BMI &lt; 18.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Normal weight: BMI 18.5 - 24.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Overweight: BMI 25 - 29.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Obese: BMI ≥ 30</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BMICalculator;
