import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BaseConverter = () => {
  const [value, setValue] = useState("");
  const [fromBase, setFromBase] = useState("decimal");
  const [toBase, setToBase] = useState("binary");

  const convert = () => {
    if (!value) return "";

    try {
      let decimal: number;

      switch (fromBase) {
        case "binary":
          decimal = parseInt(value, 2);
          break;
        case "decimal":
          decimal = parseInt(value, 10);
          break;
        case "hexadecimal":
          decimal = parseInt(value, 16);
          break;
        case "octal":
          decimal = parseInt(value, 8);
          break;
        default:
          return "";
      }

      if (isNaN(decimal)) return "";

      switch (toBase) {
        case "binary":
          return decimal.toString(2);
        case "decimal":
          return decimal.toString(10);
        case "hexadecimal":
          return decimal.toString(16).toUpperCase();
        case "octal":
          return decimal.toString(8);
        default:
          return "";
      }
    } catch {
      return "Invalid input";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Base Converter</CardTitle>
          <CardDescription>Convert numbers between binary, decimal, hexadecimal, and octal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <div className="space-y-2">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                />
                <Select value={fromBase} onValueChange={setFromBase}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binary">Binary</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                    <SelectItem value="hexadecimal">Hexadecimal</SelectItem>
                    <SelectItem value="octal">Octal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <div className="space-y-2">
                <Input
                  value={convert()}
                  readOnly
                  placeholder="Result"
                />
                <Select value={toBase} onValueChange={setToBase}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binary">Binary</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                    <SelectItem value="hexadecimal">Hexadecimal</SelectItem>
                    <SelectItem value="octal">Octal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseConverter;
