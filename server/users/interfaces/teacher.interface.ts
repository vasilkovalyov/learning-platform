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
  lang_speaking: {
    id: string
    value: string
    label: string
  }[]
  students_ages: {
    id: string
    value: string
    label: string
  }[]
  lang_teaching: {
    id: string
    value: string
    label: string
  }[]
  subjects: {
    id: string
    value: string
    label: string
  }[]
  levels_studying: {
    id: string
    value: string
    label: string
  }[]
  speaking_accent: {
    id: string
    value: string
    label: string
  }[]
  lesson_content: {
    id: string
    value: string
    label: string
  }[]
  tests: {
    id: string
    value: string
    label: string
  }[]
}
