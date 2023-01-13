import { RoleType } from '../../types/common'
import { IPlaceLiving } from './common'

export interface IFormUser {
  _id?: string
  login: string
  fullname: string
  email: string
  password: string
  confirm_password: string
  role: RoleType
}

export interface IFormTeacher extends IFormUser, IPlaceLiving {
  education: string[]
  phone: string
  work_experience: string[]
  address: string
}

export interface IAuthUserResponse<T> {
  message?: string
  data: Partial<T> | null
  token?: string
}
