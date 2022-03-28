import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: []
  },
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { setUserList } = userSlice.actions

export default userSlice.reducer

export const fetchAllUsers = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const users = await axios.get('https://reqres.in/api/users?per_page=12')
  distpatch(setUserList(users.data.data))
}