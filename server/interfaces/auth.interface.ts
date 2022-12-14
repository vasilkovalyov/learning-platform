import { RoleType } from '../../types/common';
import { IPlaceLiving } from './common';

export interface IFormUser {
  _id?: string
  login: string
  email: string
  password: string
  confirm_password: string
  role: RoleType
}

export interface IFormTeacher extends IFormUser, IPlaceLiving {
  education: string[]
  phone: string
  work_experience: string[]
  address: string
}

export interface IFormCompany extends IFormUser, IPlaceLiving {
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
  phone: string
}