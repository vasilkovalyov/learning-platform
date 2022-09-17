const mongoose = require('mongoose');
const Schema = mongoose.Schema

const model = new Schema({
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
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  inn_code: {
    type: String,
    required: true
  },
  mailing_address: {
    type: String,
    required: true
  },
  legal_address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Company', model)
