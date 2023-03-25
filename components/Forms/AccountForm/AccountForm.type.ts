import { RoleType } from 'types/common'
import { UserAccountFormInnerProps, UserAccountInfo } from 'interfaces/user.interface'

export interface AccountFormProps {
  isLoading: boolean
  role: RoleType
  initialData: UserAccountFormInnerProps
  onHandleSubmit: (props: UserAccountInfo) => void
  onHandleRemoveAccount: () => void
}
