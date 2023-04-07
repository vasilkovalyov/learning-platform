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
  privateData: string
  services: string
}

export type ITeacherAccountDataPropsResponse = Omit<ITeacherModel, 'password' | 'privateData' | 'services'>
export type ITeacherAccountDataProps = Omit<ITeacherModel, 'password' | '_id' | 'privateData' | 'services'>
export type ITeacherAccountUpdateProps = Omit<ITeacherModel, 'password' | 'role' | 'email' | 'privateData' | 'services'>

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
  },
  privateData: {
    ref: 'TeacherPrivateData',
    type: mongoose.Schema.Types.ObjectId,
  },
  services: {
    ref: 'TeacherService',
    type: mongoose.Schema.Types.ObjectId,
  },
})

export default mongoose.model<ITeacherModel>('Teacher', model)
