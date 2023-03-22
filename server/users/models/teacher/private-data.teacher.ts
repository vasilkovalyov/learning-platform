import mongoose from 'mongoose'
const Schema = mongoose.Schema

const model = new Schema({
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  local_time: {
    type: Number,
  },
  about_info: {
    type: String,
  },
  address: {
    type: String,
  },
  education: {
    type: [String],
  },
  work_experience: {
    type: [String],
  },
  certificates: {
    type: [String],
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
})

export const TeacherPrivateDataModel = mongoose.model('TeacherPrivateInfo', model)
