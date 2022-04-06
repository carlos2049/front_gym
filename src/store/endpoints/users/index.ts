import axios from 'axios'
import { setUserList } from '../../slices/users'
import { message, Button, Space } from 'antd';

const URL = process.env.REACT_APP_API_BASE_URL


export const fetchAllUsers = (limit = 5, page: number, state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/api/users?limit=${limit}&&page=${page}&&state=${state}`)
  distpatch(setUserList(res.data))
}
export const ActivateAndDeactivate = (id: number, callback: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/users/${id}`)
  callback()
  // distpatch(setUserList(users.data))
}

export const createUser = (user: Object, handleModal: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.post('http://localhost:3500/api/users', user)
  if (res.status === 200 && res.data.success) {
    // distpatch
    handleModal()
    message.success('Usuario creado exitosamente');
    return
  } else {
    message.error('Error al crear usuario');
    return
  }
  // distpatch(setUserList(users.data))
}