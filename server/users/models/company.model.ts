import mongoose from 'mongoose';
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
  role: {
    type: String,
    required: true,
    ref: 'Role'
  },
})

export const CompanyBaseInfoModel = mongoose.model('Company', model)
