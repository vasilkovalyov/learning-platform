import { TeacherCardProps } from 'components/TeacherCard/TeacherCard.type'
import { model } from 'components/TeacherCard/TeacherCard.stories'

const data: TeacherCardProps[] = [
  {
    ...model,
  },
  {
    ...model,
    id: '2',
  },
]

export default data
