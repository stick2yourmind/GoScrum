import { Navigate, Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
  const { status } = useCheckAuth()

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route element={<JournalRoutes />} path="/*" />
      ) : (
        <Route element={<AuthRoutes />} path="auth/*" />
      )}
      <Route element={<Navigate to="/auth/login" />} path="/*" />
    </Routes>
  )
}
