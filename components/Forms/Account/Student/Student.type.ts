import { IStudentProps } from 'interfaces/student.interface'
import { IUserAccountProps } from 'interfaces/user.interface'

export interface IStudentAccountFormProps {
  isLoading: boolean
  initialData: Partial<IUserAccountProps>
  onHandleSubmit: (props: IStudentAccountEditableProps) => void
  onHandleRemoveAccount: () => void
}

export type IStudentAccountEditableProps = Pick<IStudentProps, 'login' | 'phone' | 'fullname'>
