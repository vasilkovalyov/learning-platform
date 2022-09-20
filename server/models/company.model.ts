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
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  company_name: {
    type: String,
  },
  inn_code: {
    type: String,
  },
  mailing_address: {
    type: String,
  },
  legal_address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Company', model)
