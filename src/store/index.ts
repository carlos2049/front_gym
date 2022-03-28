import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'
import profiles from './slices/profiles'

export default configureStore({
  reducer: {
    users,
    profiles
  }
})