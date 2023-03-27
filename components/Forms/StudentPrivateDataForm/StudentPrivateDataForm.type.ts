import { LocationProps } from 'interfaces/common.interface'

export interface StudentPrivateFormData extends LocationProps {
  about_info: string
  subjects_learning:
    | {
        subject: string
        level: string
      }[]
    | []
}
