import { RoleType } from 'types/common'

export interface IUserStudent {
  email: string
  login: string
  role: RoleType
  password?: string
  _id?: string
}

export interface IUserTeacher {
  address: string
  city: string
  state: string
  country: string
  phone: string
  education: string[]
  work_experience: string[]
}

export interface IUserCompany {
  city: string
  state: string
  country: string
  phone: string
  company_name: string
  inn_code: string
  mailing_address: string
  legal_address: string
}
