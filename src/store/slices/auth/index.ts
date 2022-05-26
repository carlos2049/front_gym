import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    login: false,
    logout: false
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setIsLogin: (state, action) => {
      state.login = action.payload
    }
  }
})

export const { setAccessToken, setIsLogin } = authSlice.actions

export default authSlice.reducer