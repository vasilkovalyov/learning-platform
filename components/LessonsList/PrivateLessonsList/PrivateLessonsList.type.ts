export interface IPrivateLessonsList {
  title: string
  declineLessons?: (id: string) => void
}

export interface IFilterLesson {
  days: number | string
  label: string
}
