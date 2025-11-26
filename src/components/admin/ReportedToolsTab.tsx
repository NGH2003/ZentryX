import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportedToolsTab() {
    // Mock data for demonstration (can be replaced with props later)
    const reports = [];

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        Reported Tools
                    </CardTitle>
                    <CardDescription>Review and manage user reports about broken or inappropriate tools</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {reports.length > 0 ? (
                        <div className="space-y-4">
                            {/* List of reports would go here */}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                There are no reported tools at this time. Your users are happy and everything is running smoothly.
                            </p>
                            <Button variant="outline" className="gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                View Resolved Reports
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
