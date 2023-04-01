import { IUserAccountProps } from 'interfaces/user.interface'

export interface IFormLoginProps {
  onSubmit: (props: IAuthLoginProps) => void
  isLoading: boolean
  validationMessage?: string | null
}

export interface IAuthLoginProps extends Pick<IUserAccountProps, 'email'> {
  password: string
}
