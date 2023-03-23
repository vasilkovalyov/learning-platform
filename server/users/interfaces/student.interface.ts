import { IPlaceLiving } from '../../interfaces/common'
import { IUser } from './user.interface'

export interface IStudentAccount extends IUser {
  _id: string
  fullname: string
}

export type IStudentExtended = IStudentAccount & {
  password: string
}

export type IStudentSignUp = Omit<IStudentAccount, '_id'> & {
  password: string
  confirm_password: string
}
