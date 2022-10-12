import { createSlice } from '@reduxjs/toolkit'

import tasksApi from '../../../api/tasksApi'

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    inputData: null,
    message: null
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
      state.loading = false
    },
    startLoading: (state) => {
      state.loading = true
    },
    setInputData: (state, action) => {
      state.inputData = action.payload
      state.loading = false
    },
    editTaskStatus: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.id) {
          return {
            ...task,
            status: action.payload.status
          }
        }

        return task
      })
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload.id)
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.id) {
          return {
            ...task,
            title: action.payload.title,
            status: action.payload.status,
            importance: action.payload.importance,
            description: action.payload.description
          }
        }

        return task
      })
    }
  }
})

export const { setTasks, startLoading, setInputData, editTaskStatus, deleteTask, editTask } = taskSlice.actions

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
      // eslint-disable-next-line no-console
      console.log(error.message)
    }
  }
}

export const startGettingInputData = () => {
  return async (dispatch) => {
    try {
      const resp = await tasksApi.get('/task/data')

      if (resp.status === 200) {
        dispatch(setInputData(resp.data.result))
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message)
    }
  }
}
