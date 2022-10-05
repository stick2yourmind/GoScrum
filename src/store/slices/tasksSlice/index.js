import { createSlice } from '@reduxjs/toolkit'

import tasksApi from '../../../api/tasksApi'

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
      state.loading = false
    },
    startLoading: (state) => {
      state.loading = true
    }
  }
})

export const { setTasks, startLoading } = taskSlice.actions

export default taskSlice.reducer

export const startGetUserTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const resp = await tasksApi.get('/task')

      if (resp.status === 200) {
        const { data } = resp

        dispatch(setTasks(data.result))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
