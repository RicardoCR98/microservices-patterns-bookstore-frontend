import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    allowedRoles: string[];
    userRole: string | null;
    redirectTo: string;
  }

  export const ProtectedRoute = ({
    isAuthenticated,
    allowedRoles,
    userRole,
    redirectTo,
  }:ProtectedRouteProps) => {
    if (!isAuthenticated) {
      return <Navigate to={redirectTo} />;
    }
  
    if (userRole && !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />; // Puedes crear una página de "No autorizado"
    }
  
    return <Outlet />;
  };