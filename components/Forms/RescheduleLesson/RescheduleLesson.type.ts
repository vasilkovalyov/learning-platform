export interface IRescheduleLessonFormProps {
  onSubmit: (data: IRescheduleLessonProps) => void
}

export interface IRescheduleLessonProps {
  day: string
  month: string
  year: string
  timeStart: string
  duration: string
}
