import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../screens/Login'
import Register from '../screens/Register'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<Register />} path="register" />
      <Route element={<Login />} path="login" />
      <Route element={<Navigate to="login" />} path="/*" />
    </Routes>
  )
}
