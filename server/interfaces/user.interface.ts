import { RoleType } from '../../types/common';

export interface IUser {
  id: string
  login: string
  email: string
  password: string
  role: RoleType
}

export interface ITeacherUser extends IUser {
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