export interface IState {
  plans: {
    list: IPlanList[]
  },
  users: {
    list: any,
    user: any
  }

}

// lista de los planes
export interface IPlanList {
  name: string,
  state: boolean
}