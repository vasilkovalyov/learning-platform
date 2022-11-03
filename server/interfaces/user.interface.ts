import { RoleType } from '../../types/common';
import { IPlaceLiving } from './common';

export interface IUser {
  _id: string
  login: string
  email: string
  role: RoleType
  phone?: string
}

export interface ITeacherUser extends IUser, IPlaceLiving {
  address: string
  education: string[]
  work_experience: string[]
  phone: string
}

export interface ICompanyUser extends IUser, IPlaceLiving {
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
  phone: string
}