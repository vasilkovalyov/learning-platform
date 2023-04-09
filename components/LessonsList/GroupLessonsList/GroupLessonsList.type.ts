import { IGroupLessonProps } from 'interfaces/group-lesson.interface'

export interface IGroupLessonsList {
  title: string
  declineLessons?: (id: string) => void
  rescheduleLessons?: (id: string) => void
  lessons: IGroupLessonProps[] | []
}

export interface IFilterLesson {
  days: number | string
  label: string
}
