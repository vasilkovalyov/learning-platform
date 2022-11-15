import mongoose from 'mongoose';
const Schema = mongoose.Schema

export const model = new Schema({
  fullname: {
    type: String,
  },
  login: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    min: 6,
    max: 100
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    ref: 'Role'
  },
})

const modelPrivateData = new Schema({
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  local_time: {
    type: String
  },
  about_info: {
    type: String
  },
  address: {
    type: String
  },
  education: {
    type: [String]
  },
  work_experience: {
    type: [String]
  },
  certificates: {
    type: [String]
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  }
})

const modelLessons = new Schema({
  lesson_1: String,
  lesson_5: String,
  lesson_10: String,
  lesson_20: String,
  lesson_duration: Number,
})

const modelService = new Schema({
  lang_speaking: {
    type: [String]
  },
  lang_teaching: {
    type: [String]
  },
  students_ages: {
    type: [String]
  },
  subjects: {
    type: [String]
  },
  levels_studying: {
    type: [String]
  },
  speaking_accent: {
    type: [String]
  },
  lesson_content: {
    type: [String]
  },
  tests: {
    type: [String]
  },
  teacher: {
    type: String,
    required: true,
    ref: 'Teacher'
  }
})

export const TeacherBaseInfoModel = mongoose.model('Teacher', model)
export const TeacherPrivateDataModel = mongoose.model('TeacherPrivateInfo', modelPrivateData)
export const TeacherLessonsModel = mongoose.model('TeacherLessonsInfo', modelLessons)
export const TeacherServicesModel = mongoose.model('TeacherServices', modelService)
