import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/authContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;
