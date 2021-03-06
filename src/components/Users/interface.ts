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
  state: boolean
}

export interface IProfiles {
  id: number
  name: string,
  state: boolean
}

export interface IValues {
  user: {
    perfil: number,
    subplan: number,
    select_value_sub_plan: number,
    amount_months: number,
    total_plan: number,
    name: string,
    firstLastname: string,
    secondLastname: string,
    birthdate: Date,
    rut: string,
    sex: boolean,
    address: string,
    phone: string,
    email: string,
    profession: string,
    pass: string,
    image: string,
    end_date_plan: Date,
    physical_activity: string,
    desired_goal: string,
    // illnesses_and_injuries: string,
    // allergies: string,
    // emergency_contact: string,
    // emergency_phone: string,
    observations: string,
    admissionDate: Date,
    salaryBase: number,
    weeklyHours: number,
  }
}