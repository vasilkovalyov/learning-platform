export interface FilterLessonsComponentProps {
  onSubmit: (data: FilterLessonsProps) => void
}

export interface FilterFieldsFormProps {
  label: string
  value: keyof FilterLessonsProps
  options?: {
    id: number
    value: string
    label: string
  }[]
}

export interface FilterLessonsProps {
  lang_speaking: string
  lang_teaching: string
  time_teaching: string
  country: string
  price_start: number
  price_end: number
  gender: string
  student_ages: string
}
