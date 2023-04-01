import mongoose from 'mongoose'
import { IUserRoleType } from '../role.model'

const Schema = mongoose.Schema

export interface IStudentModel {
  _id: string
  fullname: string
  login: string
  email: string
  password: string
  role: IUserRoleType
  phone: string
  date: string
}

export interface IStudentSignUpProps extends Omit<IStudentModel, 'date' | 'phone' | 'role' | '_id'> {
  confirm_password: string
}

export type IStudentAccountDataPropsResponse = Omit<IStudentModel, 'password'>
export type IStudentAccountDataProps = Omit<IStudentModel, 'password' | '_id'>
export type IStudentAccountUpdateProps = Omit<IStudentModel, 'password' | 'role' | 'email'>

export const model = new Schema({
  fullname: {
    type: String,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  role: {
    ref: 'Role',
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<IStudentModel>('Student', model)
