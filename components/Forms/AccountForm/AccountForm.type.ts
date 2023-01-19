import { RoleType } from '../../../types/common'
import { UserLoginProps, UserInfoProps } from '../../../interfaces/user.interface'

export interface AccountFormProps {
  role: RoleType
}

export type EditAccountStudentFormProps = UserLoginProps & UserInfoProps
