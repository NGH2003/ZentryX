import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ThumbsUp, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FeatureRequestsTab() {
    // Mock data
    const requests = [
        {
            id: 1,
            title: "Dark Mode Support",
            description: "Please add a dark mode option for better viewing at night.",
            votes: 45,
            status: "planned",
            author: "User123",
            date: "2 days ago"
        },
        {
            id: 2,
            title: "API Access",
            description: "It would be great to have API access to the tools.",
            votes: 32,
            status: "under-review",
            author: "DevPro",
            date: "1 week ago"
        },
        {
            id: 3,
            title: "Mobile App",
            description: "A native mobile app for iOS and Android.",
            votes: 128,
            status: "in-progress",
            author: "MobileFan",
            date: "3 weeks ago"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "planned": return "bg-blue-100 text-blue-700";
            case "in-progress": return "bg-purple-100 text-purple-700";
            case "completed": return "bg-green-100 text-green-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-yellow-600 mb-1">Total Requests</div>
                        <div className="text-3xl font-bold text-gray-900">{requests.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-purple-600 mb-1">In Progress</div>
                        <div className="text-3xl font-bold text-gray-900">
                            {requests.filter(r => r.status === "in-progress").length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-green-600 mb-1">Completed</div>
                        <div className="text-3xl font-bold text-gray-900">0</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                Feature Requests
                            </CardTitle>
                            <CardDescription>Manage and track user feature requests</CardDescription>
                        </div>
                        <Button>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark All Read
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                        <div className="divide-y">
                            {requests.map((request) => (
                                <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center gap-1 min-w-[60px]">
                                            <Button variant="outline" size="sm" className="h-auto py-2 flex-col gap-1 w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span className="text-xs font-bold">{request.votes}</span>
                                            </Button>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900">{request.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {request.date}
                                                        </span>
                                                        <span>•</span>
                                                        <span>by {request.author}</span>
                                                    </div>
                                                </div>
                                                <Badge className={`${getStatusColor(request.status)} border-0 capitalize`}>
                                                    {request.status.replace("-", " ")}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600">{request.description}</p>
                                            <div className="flex items-center gap-4 pt-2">
                                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600">
                                                    <MessageSquare className="w-4 h-4 mr-2" />
                                                    Reply
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-600">
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Approve
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
