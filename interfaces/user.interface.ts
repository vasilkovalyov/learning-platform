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
