import { IGroupLessonProps } from 'interfaces/group-lesson.interface'

export interface IGroupLessonFormProps {
  onSubmit: (data: IGroupLessonProps) => void
  initialData?: IGroupLessonProps | null
}
