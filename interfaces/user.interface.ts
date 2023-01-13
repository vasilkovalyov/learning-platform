import { RoleType } from 'types/common'

export interface UserLoginProps {
  email: string
  password: string
}

export interface UserLocationProps {
  country: string
  state: string
  city: string
  address: string
}

export interface UserInfoProps extends UserLoginProps {
  fullname: string
  login: string
  phone: string
}

export interface UserAuthProps extends Omit<UserInfoProps, 'password'> {
  _id: string
  role: RoleType
}
