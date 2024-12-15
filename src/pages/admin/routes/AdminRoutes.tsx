import { Navigate, Route, Routes } from "react-router-dom"
import { AdminLayout } from "../layout/AdminLayout"


export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
      </Route>
    </Routes>
  )
}