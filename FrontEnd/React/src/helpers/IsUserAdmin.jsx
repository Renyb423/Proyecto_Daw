import { Navigate, Outlet } from "react-router-dom";

const IsUserAdmin = ({ user }) => {
    if (!user || user.role !== "ROLE_ADMIN") {
        return <Navigate to="/no-autorizado" replace />;
    }
    return <Outlet />;
};

export default IsUserAdmin;