import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ITeacherServiceModel {
  _id: string
  user: string
  lessons: ITeacherLessonInfo[] | []
  lesson_duration: number | null
  lessons_prices: {
    count: number
    prive: string
  }[]
  lang_speaking: string[]
  students_ages: string[]
  lang_teaching: string[]
  subjects: string[]
  levels_studying: string[]
}

export interface ITeacherLessonInfo {
  id: string
  count: number
  price: string
}

const model = new Schema({
  user: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
  lang_speaking: {
    type: [String],
  },
  students_ages: {
    type: [String],
  },
  lang_teaching: {
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
  lessons_prices: [
    {
      count: {
        type: Number,
      },
      price: {
        type: String,
      },
    },
  ],
  lessons: [
    {
      subject: {
        type: String,
      },
      level: {
        type: String,
      },
    },
  ],
})

export default mongoose.model('TeacherService', model)
