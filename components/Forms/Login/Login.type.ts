import { UserLoginProps } from 'interfaces/user.interface'

export interface FormLoginProps {
  onSuccess: (data: UserLoginProps) => void
  isLoading: boolean
  validationMessage?: string | null
}
