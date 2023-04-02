import { ITeacherPrivateDataProps, ITeacherServices } from 'interfaces/teacher.interface'

export type ITeacherPrivateDataEditableProps = Omit<ITeacherPrivateDataProps, '_id' | 'user'>

export type ITeacherSimpleEditableProps = Pick<
  ITeacherPrivateDataEditableProps,
  'country' | 'state' | 'city' | 'address' | 'about_info'
>

export interface ITeacherFormServices
  extends Omit<
    ITeacherPrivateDataEditableProps,
    'lang_speaking' | 'lang_teaching' | 'subjects' | 'levels_studying' | 'students_ages'
  > {
  lang_speaking:
    | {
        value: string
      }[]
    | []
  lang_teaching:
    | {
        value: string
      }[]
    | []
  subjects:
    | {
        value: string
      }[]
    | []
  levels_studying:
    | {
        value: string
      }[]
    | []
  students_ages:
    | {
        value: string
      }[]
    | []
}
