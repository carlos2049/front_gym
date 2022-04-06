import axios from 'axios'
import { setUserList } from '../../slices/users'
import { message, Button, Space } from 'antd';


export const fetchAllUsers = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const users = await axios.get('http://localhost:3500/api/users')
  distpatch(setUserList(users.data))
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