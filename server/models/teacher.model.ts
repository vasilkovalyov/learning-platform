const mongoose = require('mongoose');
const Schema = mongoose.Schema

export const model = new Schema({
  login: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    min: 6,
    max: 100
  },
  role: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  education: {
    type: [String],
  },
  work_experience: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Teacher', model)
