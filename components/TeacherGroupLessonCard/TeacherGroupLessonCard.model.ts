import { TeacherGroupLessonCardProps } from './TeacherGroupLessonCard.type'
import avatar from '../../public/images/teacher-image.jpg'

export const model: TeacherGroupLessonCardProps = {
  id: '1',
  date: '2023-10-25',
  heading: 'Basic English skills',
  image: {
    src: avatar,
    alt: 'Vasiliy Kovalyov',
  },
  fullname: 'Vasiliy Kovalyov',
  duration: 60,
  level: 'Beginners',
  ages: '10-15',
  registeredCount: 10,
  maxPersons: 15,
  price: 100,
}
