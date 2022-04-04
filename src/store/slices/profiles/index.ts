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

export const fetchAllProfiles = (state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const URL = process.env.REACT_APP_API_BASE_URL
  const profiles = await axios.get(`${URL}/profiles?state=${state}`)
  distpatch(setProfileList(profiles.data))
}