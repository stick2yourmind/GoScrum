import { createSlice } from '@reduxjs/toolkit'

const registerDataSlice = createSlice({
  name: 'registerData',
  initialState: {
    registerData: {}
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload
    }
  }
})

export const { setRegisterData } = registerDataSlice.actions

export default registerDataSlice.reducer

export const getRegisterData = () => async (dispatch) => {
  const response = await fetch('https://goscrum-api.alkemy.org/auth/data')

  const { result } = await response.json()

  dispatch(setRegisterData(result))
}
