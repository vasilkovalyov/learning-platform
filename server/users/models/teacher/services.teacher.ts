import mongoose from 'mongoose'
const Schema = mongoose.Schema

const model = new Schema({
  lang_speaking: {
    type: [Object],
  },
  lang_teaching: {
    type: [Object],
  },
  students_ages: {
    type: [Object],
  },
  subjects: {
    type: [Object],
  },
  levels_studying: {
    type: [Object],
  },
  speaking_accent: {
    type: [Object],
  },
  lesson_content: {
    type: [Object],
  },
  tests: {
    type: [Object],
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
})

export const TeacherServicesModel = mongoose.model('TeacherServices', model)
