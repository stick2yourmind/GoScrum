import { createSlice } from '@reduxjs/toolkit'

import authApi from '../../../api/authApi'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    registerData: {},
    userData: null,
    token: null,
    errorMsg: '',
    loading: false,
    status: 'not-authenticated'
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload.userData
      state.token = action.payload.token
      state.loading = false
      state.status = action.payload.status
    },
    startLoading: (state) => {
      state.loading = true
    },
    setError: (state, action) => {
      state.errorMsg = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    finishLoading: (state) => {
      state.loading = false
    }
  }
})

export const { setRegisterData, setUserData, startLoading, setError, setStatus, finishLoading } = authSlice.actions

export default authSlice.reducer

export const getRegisterData = () => {
  return async (dispatch) => {
    const response = await authApi.get('/auth/data')
    const { data } = response

    dispatch(setRegisterData(data.result))
  }
}

export const loginUser = (userName, password) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const resp = await authApi.post('/auth/login', { userName, password })

      if (resp.status === 200) {
        const { user, token } = resp.data.result

        const dataForLocalStorage = {
          user,
          token
        }

        window.localStorage.setItem('user', JSON.stringify(dataForLocalStorage))
        dispatch(setUserData({ userData: user, token: token, status: 'authenticated' }))
      }
    } catch (error) {
      // The initial values ​​are kept but the loading is changed to false
      dispatch(setUserData({ userData: null, token: null, status: 'not-authenticated' }))

      dispatch(setError(error.message))

      setTimeout(() => {
        dispatch(setError(''))
      }, 2000)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(startLoading())
    window.localStorage.removeItem('user')
    dispatch(
      setUserData({
        userData: null,
        token: null,
        status: 'not-authenticated'
      })
    )
  }
}
