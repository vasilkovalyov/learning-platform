const mongoose = require('mongoose');
const Schema = mongoose.Schema

const model = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
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
  userType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('User', model)
