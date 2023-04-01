import { ITeacherEducation } from 'interfaces/teacher.interface'

export interface IEducationFormProps {
  onSubmit: (data: ITeacherEducation) => void
  initialData: ITeacherEducation | null
}
