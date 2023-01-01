export interface ILessonCardProps {
  id: string
  dateTimestamp: string
  eventStart: string
  eventEnd: string
  heading: string
  registeredCount?: number
  maxPersons?: number
}
