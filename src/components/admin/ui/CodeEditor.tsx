import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    onChange,
    language = 'html',
    placeholder,
    className,
    readOnly = false
}) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        toast.success("Code copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("relative rounded-lg border border-slate-800 bg-slate-950 overflow-hidden", className)}>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase">{language}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={handleCopy}
                >
                    {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </Button>
            </div>
            <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                readOnly={readOnly}
                className="min-h-[200px] w-full resize-y bg-transparent p-4 font-mono text-sm text-slate-50 focus-visible:ring-0 border-0"
                spellCheck={false}
            />
        </div>
    );
};
