import { message } from "antd";
import { setPlanList, setPlan } from '../../slices/plans'

import axios from "axios";


const URL = process.env.REACT_APP_API_BASE_URL

export const fetchAllPlans = (limit = 5, page: number, state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/plans?limit=${limit}&&page=${page}&&state=${state}`)
  if (res.data.success) {
    const obj = {
      count: res.data.count,
      rows: res.data.rows
    }
    distpatch(setPlanList(obj))
  } else {
    message.error(res.data.message);
  }
}

export const searchPlans = (words: string) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/plans/search?words=${words}`)
  if (res.data && res.data.success) {
    const obj = {
      count: res.data.count,
      rows: res.data.rows
    }
    distpatch(setPlanList(obj))
  }
}

export const resetPlan = () => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  distpatch(setPlan(null))
}