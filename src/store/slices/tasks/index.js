import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload]
    }
  }
})

export const { setTasks } = taskSlice.actions

export default taskSlice.reducer
