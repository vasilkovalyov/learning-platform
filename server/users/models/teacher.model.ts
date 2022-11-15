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

export const TeacherBaseInfoModel = mongoose.model('Teacher', model)

export const TeacherPrivateDataModel = mongoose.model('TeacherPrivateData', new Schema({
  country: [String],
  state: [String],
  city: [String],
  local_time:[String],
  about_info:[String],
  lang_speaking: [String],
  lang_teaching: [String],
  students_ages: [String],
  subjects: [String],
  address: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher'
  }
})
)

const lessonSchema = new mongoose.Schema({
  id: String,
  label: String,
  value: String,
})

export const TeacherServicesModel = mongoose.model('TeacherServicesData', new Schema({
  lessons_info: {
    lessons: [lessonSchema],
    lesson_duration: String
  },
  levels_studying: [String],
  speaking_accent: [String],
  lesson_content: [String],
  tests: [String],
  education: [String],
  work_experience: [String],
  certificates: [String],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher'
  }
})
)
