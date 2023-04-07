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
  privateData: string
}

export interface IStudentSignUpProps extends Omit<IStudentModel, 'date' | 'phone' | 'role' | '_id' | 'privateData'> {
  confirm_password: string
}

export type IStudentAccountDataPropsResponse = Omit<IStudentModel, 'password' | 'privateData'>
export type IStudentAccountDataProps = Omit<IStudentModel, 'password' | '_id' | 'privateData'>
export type IStudentAccountUpdateProps = Omit<IStudentModel, 'password' | 'role' | 'email' | 'privateData'>

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
  phone: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    ref: 'Role',
    type: String,
    required: true,
  },
  privateData: {
    ref: 'TeacherPrivateData',
    type: mongoose.Schema.Types.ObjectId,
  },
})

export default mongoose.model<IStudentModel>('Student', model)
