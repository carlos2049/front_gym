import axios from 'axios'
import { setProfileList, setProfileObj } from '../../slices/profiles'

const URL = process.env.REACT_APP_API_BASE_URL


export const ActivateAndDeactivateProfile = (id: number, callback: any) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/profiles/${id}`)
  callback()
}

export const fetchAllProfiles = (state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/profiles?state=${state}`)
  distpatch(setProfileList(res.data))
}

export const resetProfile = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  distpatch(setProfileObj(null))
}

