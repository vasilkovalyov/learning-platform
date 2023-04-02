import { IUserAccountProps } from './user.interface'
import { LocationProps } from './common.interface'

export type ITeacherProps = Omit<IUserAccountProps, 'role'>

export interface ITeacherPrivateDataProps extends LocationProps, ITeacherServices {
  _id: string
  user: string
  about_info: string
  education: ITeacherEducation[]
  work_experience: ITeacherWorkExperience[]
}

export interface ITeacherServices {
  lang_speaking: {
    value: string
  }[]
  lang_teaching: {
    value: string
  }[]
  subjects: {
    value: string
  }[]
  levels_studying: {
    value: string
  }[]
  lesson_duration: number
  lessons: ITeacherLesson[]
  lessons_prices: {
    count: string
    price: string
  }[]
  students_ages: {
    value: string
  }[]
}

export interface ITeacherLesson {
  subject: string
  level: string
}

export interface ITeacherEducation extends Partial<ITeacherExperience> {
  _id?: string
  university_name: string
  faculty?: string
  specialization?: string
}

export interface ITeacherWorkExperience extends Partial<ITeacherExperience> {
  _id?: string
  company_name: string
  position?: string
  place_destination?: string
}

export interface ITeacherExperience {
  date_month_start: string
  date_year_start: number
  date_month_end: string
  date_year_end: number
}
