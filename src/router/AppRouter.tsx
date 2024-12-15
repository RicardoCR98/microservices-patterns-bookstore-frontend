import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthRoutes } from "../pages/auth/routes/AuthRoutes";
// import { AdminRoutes } from "../pages/admin/routes/AdminRoutes";
// import { UserRoutes } from "../pages/user/routes/UserRoutes";
import { useCheckAuth } from "@hooks/auth/useCheckAuth";
import { useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { BookstoreRoutes } from "src/pages/bookstore/routes/BookstoreRoutes";
// import { AdminRoutes } from "src/pages/admin/routes/AdminRoutes";

export const AppRouter = () => {
  const { role, status } = useCheckAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('status',status);
    if (status === "authenticated") {
      if (role === "USER") navigate("/home", { replace: true });
      if (role === "ADMIN") navigate("/a/dashboard", { replace: true });
    }
  }, [status, role]);

  
  return (
    <Routes >
      {/* Rutas protegidas para usuarios */}
      <Route
        path="/*"
        element={
          <ProtectedRoute
            isAuthenticated={status === "authenticated"}
            allowedRoles={["USER","ADMIN"]}
            userRole={role}
            redirectTo="/auth/login"
          />
        }
      >
        <Route path="*" element={<BookstoreRoutes />} />
      </Route>
      {/* Rutas protegidas para administradores */}
      <Route
        path="/a/*"
        // element={
        //   <ProtectedRoute
        //     isAuthenticated={status === "authenticated"}
        //     allowedRoles={["ADMIN"]}
        //     userRole={role}
        //     redirectTo="/auth/login"
        //   />
        // }
      >
        {/* <Route path="*" element={<AdminRoutes />} /> */}
      </Route>
      {/* Rutas públicas */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
