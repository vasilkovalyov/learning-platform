import { ImageProps } from 'next/image'

import { ITeacherServices, ITeacherPrivateInfo } from 'interfaces/teacher.interface'
import { UserInfoProps } from 'interfaces/user.interface'

export interface TeacherCardProps
  extends Pick<ITeacherServices, 'lang_speaking' | 'lang_teaching'>,
    Pick<ITeacherPrivateInfo, 'country'>,
    Pick<UserInfoProps, 'fullname'> {
  id: string
  image: ImageProps
  raiting: number
  description: string
}
