export interface Iprofile {
  id: number,
  name: string,
  state: boolean,
  permissions: []
}

export interface IModalProfile {
  visible: boolean,
  handleModalVisible: (visible: boolean) => void,
  profile: Iprofile | null,
  listPermissions: {
    id: number,
    state: boolean,
    name: string
  }[]
}
export interface IPermissions {
  permissions: []
}