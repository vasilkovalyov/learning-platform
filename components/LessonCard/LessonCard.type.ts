export interface LessonCardProps {
  id: string
  dateTimestamp: string
  eventStart: string
  eventEnd: string
  heading: string
  registeredCount?: number
  maxPersons?: number
}
