import { UserLocationProps, UserInfoProps } from 'interfaces/user.interface'

export type RegistrationTeacherFormFirst = UserInfoProps & {
  confirm_password: string
}

export type RegistrationTeacherFormSecondProps = UserLocationProps

export interface RegistationTeacherFormDynamicListProps {
  education: {
    value: string
  }[]
  work_experience: {
    value: string
  }[]
}

export interface RegistrationTeacherFormThirdProps {
  education: string[]
  work_experience: string[]
}

export type RegistrationTeacherFullProps = RegistrationTeacherFormFirst &
  UserLocationProps &
  RegistrationTeacherFormThirdProps

export interface RegistationTeacherFormStepProps<T> {
  inputFields?: string[]
  nextStep: () => void
  handleFormData: (name: string, value: string) => void
  values: T
}

export interface RegistationTeacherFormFinalStepProps
  extends Omit<RegistationTeacherFormStepProps<RegistrationTeacherFormThirdProps>, 'nextStep'> {
  finalStep: (params: RegistrationTeacherFormThirdProps) => void
  validationMessage?: string | null
  isLoading: boolean
}

export interface RegistrationTeacherProps {
  isLoading: boolean
  validationMessage?: string | null
  onSubmit: (data: RegistrationTeacherFullProps) => void
}

export type TextFieldStepFirstType = 'fullname' | 'login' | 'email' | 'password' | 'confirm_password' | 'phone'
export type TextFieldStepSecondType = 'country' | 'state' | 'address' | 'city'
