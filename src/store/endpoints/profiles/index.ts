import { message } from 'antd';
import axios from 'axios'
import { setProfileList, setProfileObj } from '../../slices/profiles'

const URL = process.env.REACT_APP_API_BASE_URL


export const ActivateAndDeactivateProfile = (id: number, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/profiles/${id}`)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}

export const fetchAllProfiles = (state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/profiles?state=${state}`)
  if (res.data && res.data.success) {
    distpatch(setProfileList(res.data))
  } else {
    message.error(res.data.message);
  }
}

export const getProfile = (id: number) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/profiles/${id}`)
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
  const res = await axios.put(`${URL}/profiles/${id}/profile`, permissions)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}


