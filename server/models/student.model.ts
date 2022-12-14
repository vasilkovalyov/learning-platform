const mongoose = require('mongoose');
const Schema = mongoose.Schema

export const model = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Student', model)
