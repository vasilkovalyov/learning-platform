import mongoose from 'mongoose'
import { ITeacherServicesData } from '../../interfaces/teacher.interface'

const Schema = mongoose.Schema

const model = new Schema({
  lang_speaking: {
    type: [String],
  },
  lang_teaching: {
    type: [String],
  },
  students_ages: {
    type: [String],
  },
  subjects: {
    type: [String],
  },
  levels_studying: {
    type: [String],
  },
  lesson_duration: {
    type: Number,
  },
  lessons: {
    type: {
      subject: {
        type: String,
      },
      level: {
        type: String,
      },
    },
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
})

export const TeacherServicesModel = mongoose.model<ITeacherServicesData>('TeacherServices', model)
