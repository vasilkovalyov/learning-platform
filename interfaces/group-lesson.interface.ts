import { IGroupLessonFormDataProps } from 'components/Forms/GroupLesson/GroupLesson.type'

export interface IGroupLessonProps extends IGroupLessonFormDataProps {
  _id: string
  teacher: string
  students: string[]
}
