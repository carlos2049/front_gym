import { createSlice } from '@reduxjs/toolkit'
export const planSlice = createSlice({
  name: 'plans',
  initialState: {
    listPlans: [],
    plan: null
  },
  reducers: {
    setPlanList: (state, action) => {
      state.listPlans = action.payload
    },
    setPlan: (state, action) => {
      state.plan = action.payload
    }
  }
})

export const { setPlanList, setPlan } = planSlice.actions

export default planSlice.reducer