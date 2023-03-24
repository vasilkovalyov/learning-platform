export interface RegistrationTeacherFormDataStepOne {
  fullname: string
  login: string
  email: string
  password: string
  confirm_password: string
  phone: string
}

export interface RegistrationTeacherFormDataStepTwo {
  country: string
  state: string
  city: string
  address: string
}

export interface RegistrationTeacherFormDataStepThree {
  education: {
    value: string
  }[]
  work_experience: {
    value: string
  }[]
}

export type RegistrationTeacherFullProps = RegistrationTeacherFormDataStepOne &
  RegistrationTeacherFormDataStepTwo & {
    education: string[]
    work_experience: string[]
  }

export interface RegistrationTeacherProps {
  isLoading: boolean
  validationMessage?: string | null
  onSubmit: (data: RegistrationTeacherFullProps) => void
}

export interface RegistationTeacherFormStepOneProps {
  submitForm: (props: RegistrationTeacherFormDataStepOne) => void
  disable: boolean
  closeDisable: () => void
}
export interface RegistationTeacherFormStepTwoProps {
  submitForm: (props: RegistrationTeacherFormDataStepTwo) => void
  disable: boolean
  closeDisable: () => void
}
export interface RegistationTeacherFormStepThreeProps {
  submitForm: (props: RegistrationTeacherFormDataStepThree) => void
  validationMessage?: string | null
  isLoading: boolean
}

export type TextFieldStepFirstType = 'fullname' | 'login' | 'email' | 'password' | 'confirm_password' | 'phone'
export type TextFieldStepSecondType = 'country' | 'state' | 'address' | 'city'
