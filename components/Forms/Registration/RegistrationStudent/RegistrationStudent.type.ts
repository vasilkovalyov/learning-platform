export interface IFormRegistrationStudentFormProps {
  onSuccess: (data: IRegistrationStudentProps) => void
  isLoading: boolean
  validationMessage?: string | null
}

export interface IRegistrationStudentProps {
  fullname: string
  login: string
  email: string
  password: string
  confirm_password: string
}

export type TextFieldType = 'fullname' | 'login' | 'email' | 'password' | 'confirm_password'
