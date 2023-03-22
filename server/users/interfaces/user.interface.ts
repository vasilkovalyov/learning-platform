import { RoleType } from '../../../types/common'

export interface IUser {
  _id: string
  login: string
  email: string
  role: RoleType
  phone?: string | null
}
