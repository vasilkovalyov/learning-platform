import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ITeacherGroupLessonModel {
  _id: string
  name: string
  dateLesson: Date
  recruitment_period_date_start: Date
  recruitment_period_date_end: Date
  timeStart: string
  duration: number
  price: number
  students_level: string
  students_age: string
  description: string
  min_count_of_students: number
  max_count_of_students: number
  teacher: string
  students: string[]
}

export type ITeacherGroupLessonCreateProps = Omit<ITeacherGroupLessonModel, '_id' | 'date'>
export type ITeacherGroupLessonEditProps = Omit<ITeacherGroupLessonModel, 'date'>

const model = new Schema({
  name: {
    type: String,
    require: true,
  },
  dateLesson: {
    type: Date,
    require: true,
  },
  recruitment_period_date_start: {
    type: Date,
    require: true,
  },
  recruitment_period_date_end: {
    type: Date,
    require: true,
  },
  timeStart: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  students_level: {
    type: String,
    require: true,
  },
  students_age: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  min_count_of_students: {
    type: Number,
    require: true,
  },
  max_count_of_students: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
})

export default mongoose.model<ITeacherGroupLessonModel>('TeacherGroupLesson', model)
