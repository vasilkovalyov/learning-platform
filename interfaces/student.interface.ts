import { IUserAccountProps } from './user.interface'
import { LocationProps, ISubjectLearningType } from './common.interface'

export type IStudentProps = Omit<IUserAccountProps, 'role'>

export interface IStudentPrivateDataProps extends LocationProps {
  _id: string
  user: string
  about_info: string
  subjects_learning: ISubjectLearningType[] | []
}
