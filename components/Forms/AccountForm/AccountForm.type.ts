import { RoleType } from 'types/common'
import { UserInfoProps, UserAccountInfo } from 'interfaces/user.interface'

export interface AccountFormProps {
  role: RoleType
  initialData?: UserInfoProps
  onHandleSubmit: (props: UserAccountInfo) => void
  onHandleRemoveAccount: () => void
}
