import mongoose from 'mongoose'

import { ITeacherPrivateInfo } from '../../interfaces/teacher.interface'

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
  about_info: {
    type: String,
  },
  work_experience: {
    type: [
      {
        company_name: { type: String },
        position: { type: String },
        place_destination: { type: String },
        date_month_start: {
          type: String,
        },
        date_year_start: {
          type: Number,
        },
        date_month_end: {
          type: String,
        },
        date_year_end: {
          type: Number,
        },
      },
    ],
  },
  education: {
    type: [
      {
        university_name: { type: String },
        faculty: { type: String },
        specialization: { type: String },
        date_month_start: {
          type: String,
        },
        date_year_start: {
          type: Number,
        },
        date_month_end: {
          type: String,
        },
        date_year_end: {
          type: Number,
        },
      },
    ],
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
})

export const TeacherPrivateDataModel = mongoose.model<ITeacherPrivateInfo>('TeacherPrivateData', model)
