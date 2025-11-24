import { Link } from "react-router-dom";
import { Search, BookOpen, TrendingUp, Clock, Heart, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useUsageLogs } from "@/hooks/useUsageLogs";
import { tools } from "@/data/tools";
import { getToolUrl } from "@/lib/url-utils";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const { user } = useAuth();
  const { logs, loading } = useUsageLogs();

  const recentlyUsedTools = logs.slice(0, 4).map(log =>
    tools.find(t => t.id.toString() === log.tool_id)
  ).filter(Boolean);

  const favoriteTools = tools.slice(0, 4);

  const toolsUsedCount = new Set(logs.map(log => log.tool_id)).size;
  const usageToday = logs.filter(log => {
    const today = new Date().toDateString();
    return new Date(log.created_at).toDateString() === today;
  }).length;

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tools Used</CardTitle>
              <Activity className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{toolsUsedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {logs.length} total uses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Usage Today</CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageToday}</div>
              <p className="text-xs text-muted-foreground mt-1">Tool uses today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(logs.length * 0.5)}h</div>
              <p className="text-xs text-muted-foreground mt-1">Estimated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Add favorites</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recently Used */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recently Used</CardTitle>
                  <CardDescription>Your most recent tools</CardDescription>
                </div>
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : recentlyUsedTools.length > 0 ? (
                <div className="space-y-4">
                  {recentlyUsedTools.map((tool) => (
                    tool && (
                      <div key={tool.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{tool.icon}</div>
                          <div>
                            <h4 className="font-medium">{tool.name}</h4>
                            <p className="text-xs text-muted-foreground">{tool.category}</p>
                          </div>
                        </div>
                        <Link to={getToolUrl(tool.category, tool.name)}>
                          <Button size="sm" variant="outline">Use</Button>
                        </Link>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No tools used yet. Start using tools to see them here!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Favorite Tools</CardTitle>
                  <CardDescription>Quick access to your favorites</CardDescription>
                </div>
                <Heart className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteTools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{tool.icon}</div>
                      <div>
                        <h4 className="font-medium">{tool.name}</h4>
                        <p className="text-xs text-muted-foreground">{tool.category}</p>
                      </div>
                    </div>
                    <Link to={getToolUrl(tool.category, tool.name)}>
                      <Button size="sm" variant="outline">Use</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Shortcuts to common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/tools">
                  <Button variant="outline" className="w-full justify-start h-auto py-4">
                    <Search className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Browse Tools</div>
                      <div className="text-xs text-muted-foreground">Explore all available tools</div>
                    </div>
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" className="w-full justify-start h-auto py-4">
                    <BookOpen className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Categories</div>
                      <div className="text-xs text-muted-foreground">Browse by category</div>
                    </div>
                  </Button>
                </Link>
                <Link to="/workspaces">
                  <Button variant="outline" className="w-full justify-start h-auto py-4">
                    <Activity className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Workspaces</div>
                      <div className="text-xs text-muted-foreground">Manage workspaces</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
