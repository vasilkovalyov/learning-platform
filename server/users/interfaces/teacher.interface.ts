import { IPlaceLiving } from "../../interfaces/common"
import { IStudent } from "./student.interface"

export interface ITeacherUser extends IStudent {}

export interface ITeacherPrivateData {
  _id: string
  private_data: Partial<ITeacherPrivate> | null
  lessons: Partial<ITeacherLessonsInfo> | null
  services: Partial<ITeacherServicesData> | null
}

export interface ITeacherPrivate {
  address: string
  city: string
  state: string
  country: string
  education: string[]
  work_experience: string[]
  certificates: string[]
  local_time: string
  about_info: string
}

export interface ITeacherLessonsInfo {
  lesson_1: string
  lesson_5: string
  lesson_10: string
  lesson_20: string
  lesson_duration: number
}

export interface ITeacherServicesData {
  lang_speaking: string[]
  students_ages: string[]
  lang_teaching: string[]
  subjects: string[]
  levels_studying: string[]
  speaking_accent: string[]
  lesson_content: string[]
  tests: string[]
}
