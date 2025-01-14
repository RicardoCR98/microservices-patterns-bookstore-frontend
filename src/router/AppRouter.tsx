import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthRoutes } from "../pages/auth/routes/AuthRoutes";
import { BookstoreRoutes } from "src/pages/bookstore/routes/BookstoreRoutes";
import { AdminRoutes } from "src/pages/admin/routes/AdminRoutes";

import { useCheckAuth } from "@hooks/auth/useCheckAuth";
import { useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  const { role, status } = useCheckAuth();
  const navigate = useNavigate();

  // Redirección inicial después de la autenticación
  const location = useLocation();

  useEffect(() => {
    if (status === "authenticated") {
      if (role === "USER") {
        navigate("/home", { replace: true });
      } else if (role === "ADMIN") {
        // Si NO estamos ya en /a/dashboard/usuarios (o cualquier ruta de /a/)
        // entonces sí navega a /a/dashboard
        if (!location.pathname.startsWith("/a/")) {
          navigate("/a/dashboard", { replace: true });
        }
      }
    }
  }, [status, role, navigate, location]);

  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* RUTAS PROTEGIDAS PARA USUARIOS */}
      <Route
        path="/*"
        element={
          <ProtectedRoute
            isAuthenticated={status === "authenticated"}
            allowedRoles={["USER"]}
            userRole={role}
            redirectTo="/auth/login"
          />
        }
      >
        <Route path="*" element={<BookstoreRoutes />} />
      </Route>

      {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
      <Route
        path="/a/*"
        element={
          <ProtectedRoute
            isAuthenticated={status === "authenticated"}
            allowedRoles={["ADMIN"]}
            userRole={role}
            redirectTo="/auth/a/login"
          />
        }
      >
        <Route path="*" element={<AdminRoutes />} />
      </Route>

      {/* RUTAS NO DEFINIDAS */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
