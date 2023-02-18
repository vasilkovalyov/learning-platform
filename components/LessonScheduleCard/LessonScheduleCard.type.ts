export interface ILessonScheduleCardProps {
  id: string
  eventStart: string
  eventEnd: string
  price: number
  onClick: (id: string) => void
}
