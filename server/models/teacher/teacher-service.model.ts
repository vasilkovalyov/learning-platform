import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ITeacherServiceModel {
  _id: string
  user: string
  lessons: ITeacherLessonInfo[] | []
  lesson_duration: number | null
  lang_speaking:
    | {
        id: string
        value: string
        label: string
      }[]
    | []
  students_ages:
    | {
        id: string
        value: string
        label: string
      }[]
    | []
  lang_teaching:
    | {
        id: string
        value: string
        label: string
      }[]
    | []
  subjects:
    | {
        id: string
        value: string
        label: string
      }[]
    | []
  levels_studying:
    | {
        id: string
        value: string
        label: string
      }[]
    | []
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
