import axios from 'axios'
import { setUserList } from '../../slices/users'

export const fetchAllUsers = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const users = await axios.get('http://localhost:3500/api/users')
  console.log('userss', users)
  distpatch(setUserList(users.data))
}

export const createUser = (user: Object, handleModal: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.post('http://localhost:3500/api/users', user)
  if (res.status === 200 && res.data.success) {
    return true
  } else {
    return false
  }
  console.log('ress', res)
  // distpatch(setUserList(users.data))
}