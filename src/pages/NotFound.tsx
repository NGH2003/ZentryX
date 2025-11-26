import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/zentryx/Header";
import Footer from "@/components/zentryx/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
            <h1 className="relative text-9xl font-bold text-gray-900 opacity-10">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Page Not Found
              </span>
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
