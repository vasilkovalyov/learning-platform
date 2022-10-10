export interface IFormData {
  login: string
  email: string
  password: string
  confirm_password: string
}

export interface IFormDataCompany extends IFormData {
  phone: string
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
}

export interface IFormDataTeacher extends IFormData, IFormAddress, IFormEducation {
  phone: string
  address: string
}

export interface IFormAddress {
  country: string
  state: string
  city: string
}

export interface IFormEducation {
  education: string[]
  work_experience: string[]
}
