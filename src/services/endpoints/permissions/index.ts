import { message } from 'antd';
import api from '../../../config/api';
import { setPermissionList } from '../../../store/slices/permissions'

export const ActivateAndDeactivatePermission = (id: number, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.put(`/permissions/${id}`)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}

export const fetchAllPermissions = (state: boolean, page: number, limit: number | string) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.get(`/permissions?state=${state}&&page=${page}&&limit=${limit}`)
  if (res.data && res.data.success) {
    distpatch(setPermissionList(res.data))
  } else {
    message.error(res.data.message);
  }
}

