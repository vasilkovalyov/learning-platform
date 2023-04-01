import { ITeacherWorkExperience } from 'interfaces/teacher.interface'

export interface IWorkExperienceFormProps {
  onSubmit: (data: ITeacherWorkExperience) => void
  initialData: ITeacherWorkExperience | null
}
