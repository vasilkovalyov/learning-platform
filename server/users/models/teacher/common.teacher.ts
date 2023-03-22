import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const model = new Schema({
  fullname: {
    type: String,
  },
  login: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    min: 6,
    max: 100,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
    ref: 'Role',
  },
})

export const TeacherBaseInfoModel = mongoose.model('Teacher', model)
