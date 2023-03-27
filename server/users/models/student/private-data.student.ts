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
  address: {
    type: String,
  },
  subjects_learning: {
    type: [
      {
        subject: {
          type: String,
        },
        level: {
          type: String,
        },
      },
    ],
  },
  about_info: {
    type: String,
  },
  user: {
    type: String,
    required: true,
    ref: 'Student',
  },
})

export const StudentPrivateDataModel = mongoose.model('StudentPrivateData', model)
