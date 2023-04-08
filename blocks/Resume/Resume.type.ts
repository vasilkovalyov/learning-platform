import { ITeacherEducation, ITeacherWorkExperience } from '../../interfaces/teacher.interface'

export interface IResumeProps {
  heading: string
  educations: ITeacherEducation[] | []
  work_experiences: ITeacherWorkExperience[] | []
}
