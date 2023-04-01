import { RoleType } from 'types/common'

export interface IUserAccountProps {
  _id: string
  login: string
  fullname?: string
  email: string
  phone: string
  role: RoleType
  date: string
}
