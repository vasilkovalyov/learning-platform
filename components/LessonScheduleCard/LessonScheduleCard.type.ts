export interface ILessonScheduleCardProps {
  id: string
  dateStart: string
  dateEnd: string
  price: number
  onClick: (id: string) => void
}
