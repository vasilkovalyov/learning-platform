import { RoleType } from 'types/common'

export interface LoginProps {
  email: string
  password: string
}

export interface UserAccountProps {
  _id: string
  email: string
  fullname: string
  login: string
  phone: string
  password: string
  role: RoleType
}

export type UserAccountFormInnerProps = Omit<UserAccountProps, '_id' | 'role' | 'password'>
export type UserAccountFormOuterProps = Omit<UserAccountProps, '_id' | 'login' | 'password'>

export type UserReadableAccountInfo = Omit<UserAccountProps, 'password' | 'login'>
export type UserEdtableAccountInfo = Pick<UserAccountProps, 'fullname' | 'email' | 'phone'>
