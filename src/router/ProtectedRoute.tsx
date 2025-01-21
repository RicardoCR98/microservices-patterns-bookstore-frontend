import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean; // Estado de autenticación del usuario
  allowedRoles: string[];   // Roles permitidos para acceder a la ruta
  userRole: string | null;  // Rol actual del usuario
  redirectTo: string;       // Ruta a la que redirigir si no está autenticado
}

/**
 * Componente de rutas protegidas.
 * Verifica si el usuario está autenticado y tiene un rol permitido para acceder.
 * Si no está autenticado, redirige al `redirectTo`.
 * Si el rol no está permitido, redirige a una página de "No autorizado".
 */
export const ProtectedRoute = ({
  isAuthenticated,
  allowedRoles,
  userRole,
  redirectTo,
}: ProtectedRouteProps) => {
  // Si el usuario no está autenticado, redirige al inicio de sesión o a la ruta configurada
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si el usuario tiene un rol, pero no es un rol permitido, redirige a "No autorizado"
  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si pasa las validaciones, renderiza las rutas protegidas
  return <Outlet />;
};
