import { UserInfoProps } from 'interfaces/user.interface'

export interface RegistrationStudentFormProps extends Omit<UserInfoProps, 'phone'> {
  confirm_password: string
}

export type TextFieldType = 'fullname' | 'login' | 'email' | 'password' | 'confirm_password'

export interface RegistrationStudentProps {
  onSuccess: (data: RegistrationStudentFormProps) => void
  isLoading: boolean
  validationMessage?: string | null
  inputFields: string[]
}
