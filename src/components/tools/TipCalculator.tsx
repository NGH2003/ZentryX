import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [numPeople, setNumPeople] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const people = parseInt(numPeople);

    if (!bill || !tip || !people || bill <= 0 || tip < 0 || people <= 0) return;

    const tipAmount = (bill * tip) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    setResult({
      tipAmount,
      total,
      perPerson,
      tipPerPerson
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Tip Calculator</CardTitle>
          <CardDescription>Calculate tip and split bills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bill Amount</label>
            <Input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter bill amount"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tip Percentage (%)</label>
            <div className="flex gap-2 mb-2">
              {[10, 15, 18, 20, 25].map((percent) => (
                <Button
                  key={percent}
                  variant={tipPercent === String(percent) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipPercent(String(percent))}
                >
                  {percent}%
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              placeholder="Custom tip %"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of People</label>
            <Input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              placeholder="Number of people"
              min="1"
            />
          </div>

          <Button onClick={calculateTip} className="w-full">Calculate</Button>

          {result && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <p className="text-sm text-gray-600">Tip Amount</p>
                <p className="text-2xl font-bold">${result.tipAmount.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">${result.total.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                <p className="text-sm text-gray-600">Per Person</p>
                <p className="text-2xl font-bold">${result.perPerson.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <p className="text-sm text-gray-600">Tip Per Person</p>
                <p className="text-2xl font-bold">${result.tipPerPerson.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TipCalculator;
