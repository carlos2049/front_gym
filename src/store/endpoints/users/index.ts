import axios from 'axios'
import { setUserList } from '../../slices/users'

export const fetchAllUsers = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const users = await axios.get('https://reqres.in/api/users?per_page=12')
  distpatch(setUserList(users.data.data))
}