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
  const location = useLocation();

  // Rutas válidas para usuarios y administradores
  const validUserPaths = ["/home", "/product", "/checkout", "/my-books"];
  const validAdminPaths = ["/a/dashboard", "/a/dashboard/usuarios"];

  // Manejo de redirecciones basado en el rol y ruta actual
  useEffect(() => {
    if (status === "authenticated") {
      if (role === "USER") {
        const isValidUserPath = validUserPaths.some((path) =>
          location.pathname.startsWith(path)
        );

        if (!isValidUserPath) {
          navigate("/home", { replace: true });
        }
      } else if (role === "ADMIN") {
        const isValidAdminPath = validAdminPaths.some((path) =>
          location.pathname.startsWith(path)
        );

        if (!isValidAdminPath) {
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
