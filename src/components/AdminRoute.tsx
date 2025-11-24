import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type AdminRouteProps = {
    element: React.ReactElement;
};

export const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    // Check if user is logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Check if user is admin
    const isAdmin = user.app_metadata?.role === "admin" || user.email === "admin@toolbox.com";

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return element;
};
