import { message } from "antd";
import api from '../../../config/api';
import { setPlanList, setPlan } from '../../../store/slices/plans'


export const fetchAllPlans = (limit: number | string = 5, page: number, state: boolean) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.get(`/plans?limit=${limit}&&page=${page}&&state=${state}`)
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
  const res = await api.get(`/plans/search?words=${words}`)
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

export const getPlan = (id: number) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.get(`/plans/${id}`)
  if (res.data && res.data.success) {
    distpatch(setPlan(res.data.plan))
  } else {
    message.error(res.data.message);

  }
}

export const ActivateAndDeactivatePlan = (id: number, callback: () => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.put(`/plans/plan/${id}`)
  if (res.data && res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback()
}

export const createPlan = (plan: Object, handleModal: (visible: boolean) => void) => async (distpatch: (arg0: { payload: any; type: string }) => void) => {
  const res = await api.post(`/plans`, plan)
  if (res.status === 200 && res.data.success) {
    message.success('plan creado exitosamente');
  } else {
    message.error(res.data.message);
  }
  handleModal(false)
  // distpatch(setUserList(users.data))
}

export const updatePlan = async (plan: object, id: number, callback: any) => {
  const res = await api.put(`/plans/${id}`, plan)
  if (res.data.success) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
  callback(false)
}