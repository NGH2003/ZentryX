import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { useBranding } from "@/contexts/BrandingContext";

export default function MaintenancePage() {
    const { branding } = useBranding();
    const siteName = branding.siteName || "ToolBox";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-2xl border-2 border-white/50 bg-white/80 backdrop-blur-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Wrench className="w-8 h-8 text-blue-600 animate-pulse" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Under Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-gray-600">
                        We're currently performing scheduled maintenance to improve your experience on {siteName}.
                    </p>
                    <p className="text-gray-500 text-sm">
                        We'll be back online shortly. Thank you for your patience!
                    </p>
                    <div className="pt-4">
                        <div className="flex justify-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
