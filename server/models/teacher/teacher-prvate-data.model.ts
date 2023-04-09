import mongoose from 'mongoose'
import { IPlaceLiving } from '../../interfaces/common'

const Schema = mongoose.Schema

export interface ITeacherPrivateDataModel extends IPlaceLiving {
  _id: string
  user: string
  about_info?: string
  work_experience: IWorkExperienceProps[]
  education: IEducationProps[]
}

export interface IWorkExperienceProps extends ITeacherExperienceDate {
  company_name: string
  position?: string
  place_destination?: string
}

export interface IEducationProps extends ITeacherExperienceDate {
  university_name: string
  faculty?: string
  specialization?: string
}

export interface ITeacherExperienceDate {
  date_month_start: number
  date_year_start: number
  date_month_end: number
  date_year_end: number
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
  about_info: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  work_experience: [
    {
      company_name: { type: String },
      position: { type: String },
      place_destination: { type: String },
      date_month_start: {
        type: Number,
      },
      date_year_start: {
        type: Number,
      },
      date_month_end: {
        type: Number,
      },
      date_year_end: {
        type: Number,
      },
    },
  ],
  education: [
    {
      university_name: { type: String },
      faculty: { type: String },
      specialization: { type: String },
      date_month_start: {
        type: Number,
      },
      date_year_start: {
        type: Number,
      },
      date_month_end: {
        type: Number,
      },
      date_year_end: {
        type: Number,
      },
    },
  ],
})

export default mongoose.model('TeacherPrivateData', model)
