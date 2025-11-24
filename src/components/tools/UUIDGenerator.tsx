
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";

const UUIDGenerator = () => {
  const [uuid, setUuid] = useState("");
  const [uuidList, setUuidList] = useState<string[]>([]);
  const { toast } = useToast();

  const generateUUID = () => {
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setUuid(newUuid);
    return newUuid;
  };

  const generateMultiple = (count: number) => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuidList(newUuids);
    toast({
      title: "Generated!",
      description: `${count} UUIDs generated successfully`
    });
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: "UUID copied to clipboard"
    });
  };

  const copyAllUuids = () => {
    const allUuids = uuidList.join('\n');
    navigator.clipboard.writeText(allUuids);
    toast({
      title: "Copied!",
      description: "All UUIDs copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">UUID Generator</CardTitle>
          <CardDescription>
            Generate unique identifiers (UUIDs) for your applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Single UUID</label>
            <div className="flex space-x-2">
              <Input
                value={uuid}
                readOnly
                placeholder="Click generate to create a UUID"
                className="font-mono"
              />
              <Button onClick={() => generateUUID()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate
              </Button>
              {uuid && (
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(uuid)}>
                  <Copy className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={() => generateMultiple(5)} variant="outline">
              Generate 5
            </Button>
            <Button onClick={() => generateMultiple(10)} variant="outline">
              Generate 10
            </Button>
            <Button onClick={() => generateMultiple(25)} variant="outline">
              Generate 25
            </Button>
            <Button onClick={() => generateMultiple(50)} variant="outline">
              Generate 50
            </Button>
          </div>

          {uuidList.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Generated UUIDs ({uuidList.length})</h3>
                <Button variant="outline" onClick={copyAllUuids}>
                  Copy All
                </Button>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2 border rounded-lg p-4 bg-gray-50">
                {uuidList.map((id, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="font-mono text-sm flex-1">{id}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(id)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UUIDGenerator;
