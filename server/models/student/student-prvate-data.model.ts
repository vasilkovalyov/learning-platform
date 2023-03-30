import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IStudentPrivateDataModel {
  _id: string
  country: string
  state: string
  city: string
  address: string
  subjects_learning:
    | {
        subject?: string
        level?: string
      }[]
    | []
  about_info: string
  user: string
}

// export type IStudentPrivateDataProps = Omit<IStudentPrivateDataModel, '_id'>

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
  subjects_learning: [
    {
      subject: {
        type: String,
        required: false,
      },
      level: {
        type: String,
        required: false,
      },
    },
  ],
  about_info: {
    type: String,
  },
  user: {
    type: String,
    required: true,
    ref: 'Student',
  },
})

export default mongoose.model('StudentPrivateData', model)
