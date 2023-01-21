import { UserLocationProps } from 'interfaces/user.interface'

export interface TeacherPrivateDataFormProps {
  initialData: TeacherPrivateFormProps
}

export interface TeacherPrivateFormProps extends Omit<UserLocationProps, 'address'> {
  about: string
  lesson_1: string
  lesson_5: string
  lesson_10: string
  lesson_20: string
  lang_speacking:
    | {
        value: string
      }[]
    | []
  subjects:
    | {
        value: string
      }[]
    | []
}
