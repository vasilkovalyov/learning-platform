export interface RegistrationStudentFormData {
  fullname: string
  login: string
  email: string
  password: string
  confirm_password: string
}

export type TextFieldType = 'fullname' | 'login' | 'email' | 'password' | 'confirm_password'

export interface RegistrationStudentProps {
  onSuccess: (data: RegistrationStudentFormData) => void
  isLoading: boolean
  validationMessage?: string | null
  inputFields: TextFieldType[]
}
