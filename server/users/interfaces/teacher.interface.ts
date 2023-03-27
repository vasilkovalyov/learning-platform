import { IUser } from './user.interface'
import { IPlaceLiving } from '../../interfaces/common'

export interface ITeacherAccount extends IUser {
  _id: string
  fullname: string
}

export type ITeacherExtended = ITeacherAccount & {
  password: string
}

export type ITeacherSignUp = Omit<ITeacherAccount, '_id'> &
  IPlaceLiving & {
    education: string[]
    work_experience: string[]
    password: string
    confirm_password: string
  }

export interface ITeacherPrivateData {
  _id: string
  private_data: Partial<ITeacherPrivateInfo> | null
  services: Partial<ITeacherServicesData> | null
}

export interface ITeacherPrivateInfo {
  country: string
  state: string
  city: string
  address: string
  about_info: string
  education: ITeacherEducation[]
  work_experience: ITeacherWorkExperience[]
}

export interface ITeacherServicesData {
  lessons: ITeacherLessonInfo[] | []
  lesson_duraton: number
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
}

export interface ITeacherEducation extends Partial<ITeacherExperience> {
  university_name: string
  faculty?: string
  specialization?: string
}

export interface ITeacherWorkExperience extends Partial<ITeacherExperience> {
  company_name: string
  position?: string
  place_destination?: string
}

export interface ITeacherLessonInfo {
  id: string
  count: number
  price: string
}

export interface ITeacherExperience {
  dateStart: {
    month: string
    year: number
  }
  dateEnd: {
    month: string
    year: number
  }
}
