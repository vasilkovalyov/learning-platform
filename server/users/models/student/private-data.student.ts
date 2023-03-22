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
})

export const StudentPrivateDataModel = mongoose.model('StudentPrivateData', model)
