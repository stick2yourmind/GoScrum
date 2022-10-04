import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthRoutes } from './AuthRoutes'
import { TaskRoutes } from './TaskRoutes'

export const AppRouter = () => {
  const { token } = useSelector((state) => state.auth)

  return (
    <Routes>
      {token !== null ? <Route element={<TaskRoutes />} path="/*" /> : <Route element={<AuthRoutes />} path="auth/*" />}

      <Route element={<Navigate to="/auth/login" />} path="/*" />
    </Routes>
  )
}
