import mongoose from 'mongoose'
const Schema = mongoose.Schema

export type IUserRoleType = 'student' | 'teacher'

export interface IUserRoleModel {
  _id: string
  user: string
  role: string
  email: string
  data: IUserRoleType
}

const model = new Schema({
  user: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<IUserRoleModel>('Role', model)
