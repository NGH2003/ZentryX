import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
    aspectRatio?: 'square' | 'video' | 'wide';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    label = "Upload Image",
    className,
    aspectRatio = 'video'
}) => {
    const [preview, setPreview] = useState<string | undefined>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (limit to 500KB for localStorage safety)
            if (file.size > 500 * 1024) {
                toast.error("Image too large", {
                    description: "Please upload an image smaller than 500KB to ensure it saves correctly."
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
                onChange(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(undefined);
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    const aspectClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-[21/9]'
    };

    return (
        <div className={cn("space-y-2", className)}>
            <div
                onClick={triggerUpload}
                className={cn(
                    "relative border-2 border-dashed border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors cursor-pointer bg-slate-50 group",
                    aspectClasses[aspectRatio]
                )}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="secondary" size="sm" className="gap-2">
                                <Upload size={14} /> Change
                            </Button>
                        </div>
                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleRemove}
                        >
                            <X size={14} />
                        </Button>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                            <ImageIcon size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-600">{label}</p>
                            <p className="text-xs">Click to upload or drag & drop</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
