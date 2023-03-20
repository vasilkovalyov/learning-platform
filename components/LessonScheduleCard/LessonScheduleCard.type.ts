export interface LessonScheduleCardProps extends LessonScheduleProps {
  onClick: (id: string) => void
}

export interface LessonScheduleProps {
  id: string
  eventStart: string
  eventEnd: string
  price: number
}
