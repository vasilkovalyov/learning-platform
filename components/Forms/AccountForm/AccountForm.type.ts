import { RoleType } from 'types/common'
import { UserAccountFormInnerProps, UserEdtableAccountInfo } from 'interfaces/user.interface'

export interface AccountFormProps {
  isLoading: boolean
  role: RoleType
  initialData: UserAccountFormInnerProps
  onHandleSubmit: (props: UserEdtableAccountInfo) => void
  onHandleRemoveAccount: () => void
}
