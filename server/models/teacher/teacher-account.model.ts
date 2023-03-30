import mongoose from 'mongoose'
import { IUserRoleType } from '../role.model'

const Schema = mongoose.Schema

export interface ITeacherModel {
  _id: string
  fullname: string
  login: string
  email: string
  password: string
  role: IUserRoleType
  phone: string
  date: string
}

export type ITeacherAccountDataPropsResponse = Omit<ITeacherModel, 'password'>
export type ITeacherAccountDataProps = Omit<ITeacherModel, 'password' | '_id'>
export type ITeacherAccountUpdateProps = Omit<ITeacherModel, 'password' | 'role' | 'login'>

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

export default mongoose.model<ITeacherModel>('Teacher', model)
