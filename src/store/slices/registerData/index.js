import { createSlice } from '@reduxjs/toolkit'

import goScrumApi from '../../../api/goScrumApi'

const registerDataSlice = createSlice({
  name: 'registerData',
  initialState: {
    registerData: {},
    userData: null,
    token: null,
    errorMsg: '',
    loading: false
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload.userData
      state.token = action.payload.token
      state.loading = false
    },
    startLoading: (state) => {
      state.loading = true
    },
    setError: (state, action) => {
      state.errorMsg = action.payload
    }
  }
})

export const { setRegisterData, setUserData, startLoading, setError } = registerDataSlice.actions

export default registerDataSlice.reducer

export const getRegisterData = () => {
  return async (dispatch) => {
    const response = await fetch('https://goscrum-api.alkemy.org/auth/data')
    const { result } = await response.json()

    dispatch(setRegisterData(result))
  }
}

export const loginUser = (userName, password) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const resp = await goScrumApi.post('/auth/login', { userName, password })

      if (resp.status === 200) {
        const { user, token } = resp.data.result

        localStorage.setItem('token', token)
        dispatch(setUserData({ userData: user, token: token }))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}
