import mongoose from 'mongoose';
const Schema = mongoose.Schema

const model = new Schema({
  _id: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Role', model)
