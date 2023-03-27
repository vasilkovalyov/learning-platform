import { IUser } from './user.interface'
import { IPlaceLiving } from '../../interfaces/common'

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

export interface IStudentPrivateData extends IPlaceLiving {
  about_info: string
  subjects_learning: ISudentSubjectLearning[]
}

export interface IStudentPrivateDataRequest extends Partial<IStudentPrivateData> {
  _id: string
}

export interface ISudentSubjectLearning {
  level: string
  subject: string
}
