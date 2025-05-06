import { useAuth } from "@/providers/RoleAuthorization.jsx";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const { user, loading  } = useAuth();
    console.log(user.role);
    if (!loading && (!user.isAuthenticated || user.role !== "ROLE_ADMIN")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;