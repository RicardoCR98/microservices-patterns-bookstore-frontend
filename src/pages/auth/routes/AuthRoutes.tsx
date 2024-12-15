import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage, ForgotPasswordPage,RegisterCompletePage, AdminLoginPage } from "../pages"


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="register/:token" element={<RegisterCompletePage />} />
        <Route path="forgotPassword" element={<ForgotPasswordPage/>}/>
        <Route path="a/login" element={<AdminLoginPage/>}/>
        <Route path="*" element={<Navigate to="/login"/>} />
    </Routes>
  )
}
// auth/register/0DfbiHF4zSr60UuB21e  