import { RoleType } from '../../types/common';
import { IPlaceLiving } from './common';

export interface IUser {
  _id: string
  login: string
  email: string
  role: RoleType
}

export interface ITeacherUser extends IUser, IPlaceLiving {
  phone: string
  
  address: string
  education: string[]
  work_experience: string[]
}

export interface ICompanyUser extends IUser, IPlaceLiving {
  phone: string
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
}