import { configureStore } from '@reduxjs/toolkit'

import tasks from './slices/tasksSlice'
import auth from './slices/authSlice'

export const store = configureStore({
  reducer: {
    tasks,
    auth
  }
})
