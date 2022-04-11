import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'
import profiles from './slices/profiles'
import permissions from './slices/permissions'

export default configureStore({
  reducer: {
    users,
    profiles,
    permissions
  }
})