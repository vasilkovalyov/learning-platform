import mongoose from 'mongoose'
import { IPlaceLiving } from '../../interfaces/common'

const Schema = mongoose.Schema

export interface IStudentPrivateDataModel extends IPlaceLiving {
  _id: string
  subjects_learning?:
    | {
        subject: string
        level: string
      }[]
    | []
  about_info?: string
  user: string
}

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
      },
      level: {
        type: String,
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
