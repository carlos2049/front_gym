import axios from 'axios'
import { setUserList, setUser } from '../../slices/users'
import { message } from 'antd';

const URL = process.env.REACT_APP_API_BASE_URL

export const fetchAllUsers = (limit = 5, page: number, state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/users?limit=${limit}&&page=${page}&&state=${state}`)
  distpatch(setUserList(res.data))
}

export const getUser = (id: number) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/users/user/${id}`)
  if (res.data.success && res.data.user) {
    distpatch(setUser(res.data.user))
    // callback()
  } else if (res.data.success === false) {
    message.error('Error al traer el usuario');
  }
}

export const resetUser = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  distpatch(setUser(null))
}

export const ActivateAndDeactivate = (id: number, callback: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/users/${id}`)
  callback()
  // distpatch(setUserList(users.data))
}

export const updateUser = (user: object, id: number, callback: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/users/user/${id}`, user)
  if (res.data.success) {
    callback()
    message.success(res.data.message);
  }

  // distpatch(setUserList(users.data))
}



export const createUser = (user: Object, handleModal: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.post(`${URL}/users`, user)
  if (res.status === 200 && res.data.success) {
    // distpatch
    // handleModal()
    message.success('Usuario creado exitosamente');
  } else {
    message.error(res.data.message);

  }
  handleModal()
  // distpatch(setUserList(users.data))
}