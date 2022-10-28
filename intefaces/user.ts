import { RoleType } from 'types/common'

export interface IUser {
  email: string
  login: string
  role: RoleType
  _id: string
}
