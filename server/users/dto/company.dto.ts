import { ICompanyUser } from '../interfaces/company.interface'
import UserDto from './user.dto'

class CompanyDto extends UserDto {
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string
  city: string
  state: string
  country: string
  
  constructor(data: ICompanyUser) {
      super(data)
      this.company_name = data.company_name
      this.inn_code = data.inn_code
      this.legal_address = data.legal_address
      this.mailing_address = data.mailing_address
      this.city = data.city,
      this.state = data.state,
      this.country = data.country
  }

  getAuthDataUser() {
    return {
      _id: this._id,
      company_name: this.company_name,
      email: this.email,
      login: this.login,
      phone: this.phone || '',
      role: this.role,
      inn_code: this.inn_code,
      legal_address: this.legal_address,
      mailing_address: this.mailing_address,
      city: this.city,
      state: this.state,
      country: this.country,
    }
  }
}

export default CompanyDto