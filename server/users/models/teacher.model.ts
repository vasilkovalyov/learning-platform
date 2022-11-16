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
    ref: 'Teacher'
  }
})

const modelService = new Schema({
  lang_speaking: {
    type: [Object]
  },
  lang_teaching: {
    type: [Object]
  },
  students_ages: {
    type: [Object]
  },
  subjects: {
    type: [Object]
  },
  levels_studying: {
    type: [Object]
  },
  speaking_accent: {
    type: [Object]
  },
  lesson_content: {
    type: [Object]
  },
  tests: {
    type: [Object]
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
