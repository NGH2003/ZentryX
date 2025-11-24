import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TemperatureConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");

  const convert = () => {
    if (!value || isNaN(Number(value))) return "";
    const num = Number(value);
    let celsius: number;

    switch (fromUnit) {
      case "celsius":
        celsius = num;
        break;
      case "fahrenheit":
        celsius = (num - 32) * 5/9;
        break;
      case "kelvin":
        celsius = num - 273.15;
        break;
      default:
        return "";
    }

    let result: number;
    switch (toUnit) {
      case "celsius":
        result = celsius;
        break;
      case "fahrenheit":
        result = (celsius * 9/5) + 32;
        break;
      case "kelvin":
        result = celsius + 273.15;
        break;
      default:
        return "";
    }

    return result.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Temperature Converter</CardTitle>
          <CardDescription>Convert between Celsius, Fahrenheit, and Kelvin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={convert()}
                  readOnly
                  placeholder="Result"
                />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="kelvin">Kelvin (K)</SelectItem>
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

export default TemperatureConverter;
