import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'
import profiles from './slices/profiles'
import permissions from './slices/permissions'
import plans from './slices/plans'
import subplans from './slices/subplans'

export default configureStore({
  reducer: {
    users,
    profiles,
    permissions,
    plans,
    subplans
  }
})