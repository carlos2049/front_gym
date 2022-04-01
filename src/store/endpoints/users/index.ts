import axios from 'axios'
import { setUserList } from '../../slices/users'

export const fetchAllUsers = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const users = await axios.get('http://localhost:3500/api/users')
  console.log('userss', users)
  distpatch(setUserList(users.data))
}