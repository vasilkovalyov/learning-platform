import { IPlaceLiving } from '../../interfaces/common'
import { IUser } from './user.interface'

export interface IStudentAccount extends IUser {
  fullname: string
}

export type IStudentExtended = IStudentAccount & {
  password: string
}

export type IStudentSignUp = IStudentAccount & {
  password: string
  confirm_password: string
}

export interface IStudentPrivateData extends IPlaceLiving {
  local_time: number
  about_info: string
}
