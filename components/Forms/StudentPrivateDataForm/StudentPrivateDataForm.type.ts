import { LocationProps } from 'interfaces/common.interface'

export interface StudentPrivateFormProps extends LocationProps {
  about: string
  subjects_learning:
    | {
        subject: string
        level: string
      }[]
    | []
}
