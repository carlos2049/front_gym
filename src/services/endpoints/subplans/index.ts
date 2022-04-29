import { message } from "antd";
import axios from "axios";
import { setSubplanList, setSubplan } from '../../../store/slices/subplans'


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

export const searchsubplans = (words: string) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/subplans/search?words=${words}`)
  if (res.data && res.data.success) {
    const obj = {
      count: res.data.count,
      rows: res.data.rows
    }
    distpatch(setSubplanList(obj))
  }
}

export const ActivateAndDeactivateSubplan = (id: number, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.put(`${URL}/subplans/subplan/${id}`)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}

export const getSubplan = (id: number) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.get(`${URL}/subplans/${id}`)
  if (res.data && res.data.success) {
    distpatch(setSubplan(res.data.subplan))
  } else {
    message.error(res.data.message);

  }
}

export const createSubplan = (subplan: Object, handleModal: (visible: boolean) => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await axios.post(`${URL}/plans`, subplan)
  if (res.status === 200 && res.data.success) {
    message.success('subplan creado exitosamente');
  } else {
    message.error(res.data.message);
  }
  handleModal(false)
  // distpatch(setUserList(users.data))
}

export const updateSubplan = async (subplan: object, id: number, callback: any) => {
  const res = await axios.put(`${URL}/subplans/${id}`, subplan)
  if (res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback(false)
}