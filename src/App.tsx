import { Toaster } from "@/components/ui/toaster";
import { BrandingProvider } from "@/contexts/BrandingContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import { AdsProvider } from "@/contexts/AdsContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { MaintenanceProvider, useMaintenance } from "@/contexts/MaintenanceContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { DynamicMetadata } from "@/components/DynamicMetadata";
import ErrorBoundary from "./components/ErrorBoundary";

// Page components
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import BugReport from "./pages/BugReport";
import FeatureRequest from "./pages/FeatureRequest";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Maintenance from "./pages/Maintenance";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isMaintenanceMode } = useMaintenance();
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  // If maintenance mode is enabled and user is not authenticated, show maintenance page
  if (isMaintenanceMode && !isAuthenticated && !loading) {
    return <Maintenance />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/:category/:toolName" element={<ToolDetail />} />
      <Route path="/backend" element={<AdminRoute element={<Admin />} />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<AdminRoute element={<Auth />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/bug-report" element={<BugReport />} />
      <Route path="/feature-request" element={<FeatureRequest />} />
      <Route path="/support" element={<Support />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* Redirect old tool URLs to tools page */}
      <Route path="/tool/:id" element={<Navigate to="/tools" replace />} />
      <Route path="/tool/:id/detail" element={<Navigate to="/tools" replace />} />
      <Route path="/tools/:category/:toolName/detail" element={<Navigate to="/tools/:category/:toolName" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrandingProvider>
        <BlogProvider>
          <AnalyticsProvider>
            <AdsProvider>
              <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                  <AuthProvider>
                    <MaintenanceProvider>
                      <BrowserRouter>
                        <DynamicMetadata />
                        <AppRoutes />
                      </BrowserRouter>
                    </MaintenanceProvider>
                  </AuthProvider>
                </TooltipProvider>
              </QueryClientProvider>
            </AdsProvider>
          </AnalyticsProvider>
        </BlogProvider>
      </BrandingProvider>
      <Toaster />
      <Sonner />
    </ErrorBoundary>
  );
}

export default App;
