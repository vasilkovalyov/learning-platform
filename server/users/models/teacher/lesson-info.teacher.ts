import mongoose from 'mongoose'
const Schema = mongoose.Schema

const model = new Schema({
  lesson_1: {
    type: String,
  },
  lesson_5: {
    type: String,
  },
  lesson_10: {
    type: String,
  },
  lesson_20: {
    type: String,
  },
  lesson_duration: {
    type: Number,
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
})

export const TeacherLessonsModel = mongoose.model('TeacherLessonsInfo', model)
