import { IPlaceLiving } from "../../interfaces/common"
import { IStudent } from "./student.interface"

export interface ITeacherUser extends IStudent {
  address: string
  education: string[]
  work_experience: string[]
  city: string
  state: string
  country: string
}

export interface ITeacherPrivateData extends IPlaceLiving {
  local_time: string
  about_info: string
  lang_speaking: string[]
  lang_teaching: string[]
  students_ages: string[]
  subjects: string[]
}

export interface ITeacherServicesData {
  lessons_info: {
    lessons: {
      id: string
      label: string
      value: string
    }[]
    lesson_duration: string[]
  }
  levels_studying: string[]
  speaking_accent: string[]
  lesson_content: string[]
  tests: string[]
  education: string[]
  work_experience: string[]
  certificates: string[]
}