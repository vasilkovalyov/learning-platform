import { LoginProps } from 'interfaces/user.interface'

export interface FormLoginProps {
  onSubmit: (props: LoginProps) => void
  isLoading: boolean
  validationMessage?: string | null
}
