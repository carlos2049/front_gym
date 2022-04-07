import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    user: null
  },
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUserList, setUser } = userSlice.actions

export default userSlice.reducer

export const fetchAllUsers = (limit = 5, page: number, state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const URL = process.env.REACT_APP_API_BASE_URL
  const users = await axios.get(`${URL}/users?limit=${limit}&&page=${page}&&state=${state}`)
  console.log(users.data)
  distpatch(setUserList(users.data))
}