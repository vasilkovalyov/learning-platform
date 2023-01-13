import { RoleType } from 'types/common'

export interface IUserStudent {
  fullname: string
  email: string
  login: string
  role: RoleType
  password?: string
  _id: string
}
