import { message } from "antd";
import axios from "axios";
import { setSubplanList, setSubplan } from '../../slices/subplans'


const URL = process.env.REACT_APP_API_BASE_URL

export const fetchAllSubplans = (limit = 5, page: number, state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/subplans?limit=${limit}&&page=${page}&&state=${state}`)
  if (res.data.success) {
    const obj = {
      count: res.data.count,
      rows: res.data.rows
    }
    distpatch(setSubplanList(obj))
  } else {
    message.error(res.data.message);
  }
}