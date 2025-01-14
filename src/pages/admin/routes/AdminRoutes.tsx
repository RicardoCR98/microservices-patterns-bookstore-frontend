import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
import { Dashboard } from "../pages/Dashboard";
import { UserManagement } from "src/pages/admin/sections/administracion/UserManagment";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* RUTA /a/dashboard */}
        <Route path="dashboard" element={<Dashboard />}>
          {/* RUTA /a/dashboard/usuarios anidada dentro de Dashboard */}
          <Route path="usuarios" element={<UserManagement />} />
        </Route>

        {/* Si no coincide, redirige */}
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};
