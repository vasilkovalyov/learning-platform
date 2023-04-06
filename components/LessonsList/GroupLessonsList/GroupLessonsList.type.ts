export interface IGroupLessonsList {
  title: string
  declineLessons?: (id: string) => void
  rescheduleLessons?: (id: string) => void
}

export interface IFilterLesson {
  days: number | string
  label: string
}
