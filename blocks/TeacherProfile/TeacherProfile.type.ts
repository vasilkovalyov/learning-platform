import { ImageProps } from 'next/image'
import { ITeacherServices } from '../../interfaces/teacher.interface'
import { LocationProps } from '../../interfaces/common.interface'

export interface ITeacherProfileProps
  extends Pick<LocationProps, 'country'>,
    Pick<ITeacherServices, 'lang_speaking' | 'lang_teaching'> {
  image?: ImageProps
  fullname: string
  time: string
  experience: number
  countOfStudents?: number
  countOfLessons?: number
  videoPreviewSrc?: string
  hasShadow?: boolean
}
