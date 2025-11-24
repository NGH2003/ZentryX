import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SpeedConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kmh");
  const [toUnit, setToUnit] = useState("mph");

  const units: Record<string, number> = {
    kmh: 1,
    mph: 0.621371,
    ms: 0.277778,
    knot: 0.539957,
    fps: 0.911344
  };

  const unitLabels: Record<string, string> = {
    kmh: "Kilometers per hour (km/h)",
    mph: "Miles per hour (mph)",
    ms: "Meters per second (m/s)",
    knot: "Knots",
    fps: "Feet per second (ft/s)"
  };

  const convert = () => {
    if (!value || isNaN(Number(value))) return "";
    const kmh = Number(value) / units[fromUnit];
    return (kmh * units[toUnit]).toFixed(6);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Speed Converter</CardTitle>
          <CardDescription>Convert between different speed units</CardDescription>
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
                    {Object.keys(units).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unitLabels[unit]}
                      </SelectItem>
                    ))}
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
                    {Object.keys(units).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unitLabels[unit]}
                      </SelectItem>
                    ))}
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

export default SpeedConverter;
