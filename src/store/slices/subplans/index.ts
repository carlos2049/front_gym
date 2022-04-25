import { createSlice } from '@reduxjs/toolkit'
export const subplanSlice = createSlice({
  name: 'subplans',
  initialState: {
    listSubplans: [],
    subplan: null
  },
  reducers: {
    setSubplanList: (state, action) => {
      state.listSubplans = action.payload
    },
    setSubplan: (state, action) => {
      state.subplan = action.payload
    }
  }
})

export const { setSubplanList, setSubplan } = subplanSlice.actions

export default subplanSlice.reducer