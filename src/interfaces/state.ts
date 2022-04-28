export interface IState {
  plans: {
    listPlans: {
      rows: IPlan[],
      count: number
    },
    plan: IPlan
  },
  users: {
    list: {
      rows: IUser[],
      count: number
    },
    user: IUser
  },
  profiles: {
    list: IProfile[],
    profile: IProfile
  },
  permissions: {
    listPermissions: {
      rows: IPermission[],
      count: number
    }
  },
  subplans: {
    listSubplans: {
      rows: ISubplan[],
      count: number
    },
    subplan: ISubplan
  }
}

//  planes
export interface IPlan {
  id: number
  name: string,
  state: boolean
}

export interface IUser {
  id: number,
  id_perfil: number,
  id_sub_plan: number,
  value_sub_plan: number,
  amount_months: number,
  total_plan: number,
  names: string,
  first_last_name: string,
  second_last_name: string,
  birth_date: Date,
  rut: string,
  sex: boolean,
  address: string,
  phone: string,
  email: string,
  profession: string,
  password: string,
  image: string,
  end_date_plan: Date,
  physical_activity: string,
  desired_goal: string,
  illnesses_and_injuries: string,
  allergies: string,
  emergency_contact: string,
  emergency_phone: string,
  observations: string,
  admission_date: Date,
  salary_base: number,
  weekly_hours: number,
  state: boolean,
  createdAt: string,
  updatedAt: string
}

interface IProfile {
  id: number,
  name: string,
  state: boolean,
  permissions: []
}

interface IPermission {
  id: number,
  name: string,
  state: boolean
}

export interface ISubplan {
  id: number,
  plan: number,
  name: string,
  monthly_value: number,
  quarterly_value: number,
  semester_value: number,
  annual_value: number,
  state: boolean
}