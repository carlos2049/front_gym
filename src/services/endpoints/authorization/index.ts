import { message } from "antd";
import axios from "axios";
import { setAccessToken, setIsLogin } from '../../../store/slices/auth'

import { appApiBaseUrl } from '../../../config'


export const login = ({ rut, password }: { rut: string, password: string }) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.post(`${appApiBaseUrl}/login`, {
    rut,
    password
  })
  if (res.data && res.data.success) {
    localStorage.setItem('accessToken', res.data.token)
    distpatch(setAccessToken(true))
    // distpatch(setIsLogin(true))

  } else if (res.data && !res.data.success) {
    message.error(res.data.message);
  }
}