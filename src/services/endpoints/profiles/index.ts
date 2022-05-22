import { message } from 'antd';
import api from '../../../config/api';
import { setProfileList, setProfileObj } from '../../../store/slices/profiles'

export const ActivateAndDeactivateProfile = (id: number, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.put(`/profiles/${id}`)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}

export const fetchAllProfiles = (state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  // const tokenLocalStorage = localStorage.getItem('React_token')

  // const header = `Bearer ${tokenLocalStorage}`
  const res = await api.get(`/profiles?state=${state}`,
    // { headers: { Authorization: header } }
  )
  if (res.data && res.data.success) {
    distpatch(setProfileList(res.data.profiles))
  } else {
    message.error(res.data.message);
  }
}

export const getProfile = (id: number) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.get(`/profiles/${id}`)
  if (res.data && res.data.success) {
    distpatch(setProfileObj(res.data.profile))
  } else {
    message.error(res.data.message);
  }
}

export const resetProfile = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  distpatch(setProfileObj(null))
}

export const updateProfilePermissions = (id: number, permissions: { permissions: [] }, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.put(`/profiles/${id}/profile`, permissions)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}


