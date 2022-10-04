import { Navigate, Route, Routes } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'

export const TaskRoutes = () => {
  return (
    <Routes>
      <Route element={<HomeScreen />} path="/" />
      <Route element={<Navigate to="/" />} path="/*" />
    </Routes>
  )
}
