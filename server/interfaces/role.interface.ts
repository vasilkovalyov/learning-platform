import { RoleType } from '../../types/common'

export interface IRole {
  _id: string
  role: RoleType
  email: string
  date: Date
}
