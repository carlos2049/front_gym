import { createSlice } from '@reduxjs/toolkit'
export const permissionSlice = createSlice({
  name: 'permissions',
  initialState: {
    list: [],
  },
  reducers: {
    setPermissionList: (state, action) => {
      state.list = action.payload
    },
  }
})

export const { setPermissionList } = permissionSlice.actions

export default permissionSlice.reducer