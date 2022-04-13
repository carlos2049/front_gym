import { createSlice } from '@reduxjs/toolkit'
export const permissionSlice = createSlice({
  name: 'permissions',
  initialState: {
    listPermissions: [],
  },
  reducers: {
    setPermissionList: (state, action) => {
      state.listPermissions = action.payload
    },
  }
})

export const { setPermissionList } = permissionSlice.actions

export default permissionSlice.reducer