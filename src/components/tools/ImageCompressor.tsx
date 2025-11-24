
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download } from "lucide-react";

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setOriginalSize(file.size);
        setCompressedImage(null);
      } else {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          variant: "destructive"
        });
      }
    }
  };

  const compressImage = () => {
    if (!selectedFile) {
      toast({
        title: "No Image",
        description: "Please select an image first",
        variant: "destructive"
      });
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx?.drawImage(img, 0, 0);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImage(compressedDataUrl);
      
      // Calculate compressed size (rough estimation)
      const compressedSizeEstimate = Math.round((compressedDataUrl.length * 3) / 4);
      setCompressedSize(compressedSizeEstimate);
      
      toast({
        title: "Compressed!",
        description: "Image compressed successfully"
      });
    };

    img.src = URL.createObjectURL(selectedFile);
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed_${selectedFile?.name || 'image.jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: "Compressed image downloaded"
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Image Compressor</CardTitle>
          <CardDescription>
            Compress images to reduce file size while maintaining quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Image:
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>

          {selectedFile && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button onClick={compressImage} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Compress Image
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold">Original</div>
                  <div className="text-sm text-gray-600">{formatFileSize(originalSize)}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-semibold">Compressed</div>
                  <div className="text-sm text-gray-600">{formatFileSize(compressedSize)}</div>
                </div>
              </div>
            </>
          )}

          {compressedImage && (
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={compressedImage} 
                  alt="Compressed" 
                  className="max-w-full h-auto rounded-lg border"
                />
              </div>
              <Button onClick={downloadCompressed} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Compressed Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageCompressor;
