import { Navigate, Route, Routes } from 'react-router-dom'

import { useCheckAuth } from '../hooks/useCheckAuth'

import { AuthRoutes } from './AuthRoutes'
import { TaskRoutes } from './TaskRoutes'

export const AppRouter = () => {
  const { status } = useCheckAuth()

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route element={<TaskRoutes />} path="/*" />
      ) : (
        <Route element={<AuthRoutes />} path="auth/*" />
      )}

      <Route element={<Navigate to="/auth/login" />} path="/*" />
    </Routes>
  )
}
