import { Navigate, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  RegisterCompletePage,
  AdminLoginPage,
} from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/* Login de usuario normal */}
      <Route path="login" element={<LoginPage />} />

      {/* Registro de usuario */}
      <Route path="register" element={<RegisterPage />} />
      <Route path="register/:token" element={<RegisterCompletePage />} />

      {/* Recuperar contraseña */}
      <Route path="forgotPassword" element={<ForgotPasswordPage />} />

      {/* Login de administrador */}
      <Route path="a/login" element={<AdminLoginPage />} />

      {/* Cualquier otra ruta dentro de /auth redirige a login */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
