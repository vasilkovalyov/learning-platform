export interface IGroupLessonFormProps {
  onSubmit: (data: IGroupLessonFormDataProps) => void
  initialData?: IGroupLessonFormDataProps | null
  isLoading?: boolean
}

export interface IGroupLessonFormDataProps {
  name: string
  dateLesson: string
  recruitment_period_date_start: string
  recruitment_period_date_end: string
  timeStart: string
  duration: number
  price: number
  students_level: string
  students_age: string
  description: string
  min_count_of_students: number
  max_count_of_students: number
}

export interface IGroupLessonFormDataUpdateProps extends IGroupLessonFormDataProps {
  _id: string
  teacher: string
  students: string[] | []
}
