export interface IGroupLessonFormProps {
  onSubmit: (data: IGroupLessonFormDataProps) => void
  initialData?: IGroupLessonFormDataProps | null
  isLoading?: boolean
}

export interface IGroupLessonFormDataProps {
  name: string
  dateLesson: Date | null
  recruitment_period_date_start: Date | null
  recruitment_period_date_end: Date | null
  timeStart: string
  duration: number | null
  price: number | null
  students_level: string
  students_age: string
  description: string
  min_count_of_students: number | null
  max_count_of_students: number | null
}
