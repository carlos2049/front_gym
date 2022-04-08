import { createSlice } from '@reduxjs/toolkit'
export const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    list: [],
    profile: null
  },
  reducers: {
    setProfileList: (state, action) => {
      state.list = action.payload
    },
    setProfileObj: (state, action) => {
      state.profile = action.payload
    }
  }
})

export const { setProfileList, setProfileObj } = profileSlice.actions

export default profileSlice.reducer

