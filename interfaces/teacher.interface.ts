export interface ITeacherPrivateData {
  _id: string
  private_data: Partial<ITeacherPrivateInfo>
  lessons: Partial<ITeacherLessonsInfo>
  services: Partial<ITeacherServices>
}

export interface ITeacherPrivateInfo {
  address: string
  city: string
  state: string
  country: string
  education: string[]
  work_experience: string[]
  certificates: string[]
  local_time: number
  about_info: string
}

export interface ITeacherLessonsInfo {
  lesson_1: string
  lesson_5: string
  lesson_10: string
  lesson_20: string
  lesson_duration: number
}

export interface ITeacherServices {
  lang_speaking: string[]
  students_ages: string[]
  lang_teaching: string[]
  subjects: string[]
  levels_studying: string[]
  speaking_accent: string[]
  lesson_content: string[]
  tests: string[]
}
