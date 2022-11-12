import mongoose from 'mongoose';
const Schema = mongoose.Schema

export const model = new Schema({
  fullname: {
    type: String,
  },
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 100
  },
  role: {
    type: String,
    required: true,
    ref: 'Role'
  },
  phone: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Student', model)
