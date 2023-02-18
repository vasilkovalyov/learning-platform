import { UserLocationProps } from 'interfaces/user.interface'

export interface StudentPrivateFormProps extends UserLocationProps {
  about: string
  subjects_learning:
    | {
        subject: string
        level: string
      }[]
    | []
}
