import { createSlice } from '@reduxjs/toolkit'
export const planSlice = createSlice({
  name: 'plans',
  initialState: {
    listPlans: [],
  },
  reducers: {
    setPlanList: (state, action) => {
      state.listPlans = action.payload
    },
  }
})

export const { setPlanList } = planSlice.actions

export default planSlice.reducer