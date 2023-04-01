import { IUserAccountProps } from 'interfaces/user.interface'

export interface ITeacherAccountFormProps {
  isLoading: boolean
  initialData: Partial<IUserAccountProps>
  onHandleSubmit: (props: ITeacherAccountEditableProps) => void
  onHandleRemoveAccount: () => void
}

export type ITeacherAccountEditableProps = Pick<IUserAccountProps, 'fullname' | 'login' | 'phone'>
