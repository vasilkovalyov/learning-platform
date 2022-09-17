import { RoleType } from '../../types/common';

export interface IUser {
  _id?: string
  login: string
  email: string
  password: string
  role: RoleType
}

export interface IUserSignIn extends Pick<IUser, 'email' | 'password'> {}

export interface IUserSignUp extends IUser {
  confirm_password: string
}

export interface ITeacherUser extends IUserSignUp {
  phone: string
  passport: string
  country: string
  city: string
  address: string
  education: string[]
  work_experience: string[]
  diploma: any
}

export interface ICompanyUser extends IUser {
  phone: string
  company_name: string
  inn_code: string
  country: string
  city: string
  legal_address: string
  mailing_address: string
}

export interface IAuth extends Pick<IUser, 'email' | 'password'> {}