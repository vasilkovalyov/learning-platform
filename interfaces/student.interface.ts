import { RoleType } from 'types/common'

export interface IStudentAuthInfo {
  _id?: string
  fullname: string
  email: string
  login: string
  role: RoleType
  phone: string
}
