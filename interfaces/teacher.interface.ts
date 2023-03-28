import { LocationProps } from './common.interface'

export interface ITeacherPrivateData {
  _id: string
  private_data: Partial<ITeacherPrivateInfo>
  services: Partial<ITeacherServices>
}

export interface ITeacherPrivateInfo extends LocationProps {
  education: ITeacherEducation[]
  work_experience: ITeacherWorkExperience[]
  about_info: string
}

export interface ITeacherServices {
  lang_speaking: string[]
  lang_teaching: string[]
  students_ages: string[]
  subjects: string[]
  levels_studying: string[]
  lesson_duration: number
  lessons: ITeacherLesson[]
}

export interface ITeacherLesson {
  subject: string
  level: string
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
