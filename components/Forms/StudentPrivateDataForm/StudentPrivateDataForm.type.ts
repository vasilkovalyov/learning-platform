import { UserLocationProps } from 'interfaces/user.interface'
export interface StudentPrivateDataFormProps {
  initialData: StudentPrivateFormProps
}

export interface StudentPrivateFormProps extends UserLocationProps {
  about: string
}
