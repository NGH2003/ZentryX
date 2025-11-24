import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RomanNumeralConverter = () => {
  const [arabicInput, setArabicInput] = useState("");
  const [romanInput, setRomanInput] = useState("");
  const [arabicResult, setArabicResult] = useState("");
  const [romanResult, setRomanResult] = useState("");

  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return "Number must be between 1 and 3999";

    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" }
    ];

    let result = "";
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (str: string): string => {
    const romanValues: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };

    str = str.toUpperCase();
    let result = 0;

    for (let i = 0; i < str.length; i++) {
      const current = romanValues[str[i]];
      const next = romanValues[str[i + 1]];

      if (!current) return "Invalid Roman numeral";

      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }

    return result.toString();
  };

  const handleArabicConvert = () => {
    const num = parseInt(arabicInput);
    if (isNaN(num)) {
      setRomanResult("Please enter a valid number");
      return;
    }
    setRomanResult(toRoman(num));
  };

  const handleRomanConvert = () => {
    if (!romanInput) {
      setArabicResult("Please enter a Roman numeral");
      return;
    }
    setArabicResult(fromRoman(romanInput));
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Arabic to Roman</CardTitle>
          <CardDescription>Convert numbers to Roman numerals (1-3999)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter Number</label>
            <Input
              type="number"
              value={arabicInput}
              onChange={(e) => setArabicInput(e.target.value)}
              placeholder="Enter a number (1-3999)"
              min="1"
              max="3999"
            />
          </div>

          <Button onClick={handleArabicConvert} className="w-full">Convert to Roman</Button>

          {romanResult && (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Result</p>
              <p className="text-3xl font-bold">{romanResult}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Roman to Arabic</CardTitle>
          <CardDescription>Convert Roman numerals to numbers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter Roman Numeral</label>
            <Input
              value={romanInput}
              onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
              placeholder="Enter Roman numeral (e.g., XIV)"
            />
          </div>

          <Button onClick={handleRomanConvert} className="w-full">Convert to Arabic</Button>

          {arabicResult && (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Result</p>
              <p className="text-3xl font-bold">{arabicResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RomanNumeralConverter;
