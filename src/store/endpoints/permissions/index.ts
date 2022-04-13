import axios from 'axios'
import { setPermissionList } from '../../slices/permissions'

const URL = process.env.REACT_APP_API_BASE_URL


export const ActivateAndDeactivatePermission = (id: number, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/permissions/${id}`)
  callback()
}

export const fetchAllPermissions = (state: boolean, page: number, limit: number | string) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/permissions?state=${state}&&page=${page}&&limit=${limit}`)
  distpatch(setPermissionList(res.data))
}

