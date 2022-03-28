import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    list: []
  },
  reducers: {
    setProfileList: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { setProfileList } = profileSlice.actions

export default profileSlice.reducer

export const fetchAllProfiles = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const profiles = await axios.get('http://localhost:3500/api/profiles/')
  distpatch(setProfileList(profiles.data))
}