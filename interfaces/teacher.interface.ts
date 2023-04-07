import { IUserAccountProps } from './user.interface'
import { LocationProps } from './common.interface'

export type ITeacherProps = Omit<IUserAccountProps, 'role'>

export interface ITeacherPrivateDataProps extends LocationProps, ITeacherServices {
  _id: string
  user: string
  about_info?: string | null
  education: ITeacherEducation[]
  work_experience: ITeacherWorkExperience[]
}

export interface ITeacherCardProps extends Pick<ITeacherPrivateDataProps, '_id' | 'about_info'> {
  fullname: string
  privateData: Pick<ITeacherPrivateDataProps, '_id' | 'about_info' | 'country' | 'user'>
  services: Partial<Pick<ITeacherServices, 'lang_speaking' | 'lang_teaching'>> & {
    _id: string
    user: string
  }
}

export interface ITeacherProfileInfo extends Omit<IUserAccountProps, 'password'> {
  privateData: ITeacherPrivateDataProps
  services: ITeacherServices
}

export interface ITeacherServices {
  lang_speaking: string[]
  lang_teaching: string[]
  subjects: string[]
  levels_studying: string[]
  lesson_duration: number
  lessons: ITeacherLesson[]
  lessons_prices: {
    count: string
    price: string
  }[]
  students_ages: string[]
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
