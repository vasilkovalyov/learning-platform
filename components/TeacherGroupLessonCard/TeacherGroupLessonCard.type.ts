import { ImageProps } from 'next/image'

export interface TeacherGroupLessonCardProps {
  id: string
  date: string
  heading: string
  image: ImageProps
  fullname: string
  price: number
  duration: number
  level: string
  ages: string
  registeredCount: number
  maxPersons: number
}
