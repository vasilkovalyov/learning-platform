import { RoleType } from 'types/common'
import { UserLoginProps, UserInfoProps } from 'interfaces/user.interface'

// export type AccountProps = UserLoginProps & UserInfoProps

export interface AccountFormProps {
  role: RoleType
  initialData?: UserInfoProps
  onHandleRemoveAccount: () => void
}
