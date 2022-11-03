import { UserAccountType } from '../types/common'
import { IUser, ITeacherUser, ICompanyUser } from '../interfaces/user.interface'

class User implements IUser {
  _id: string
  login: string
  email: string
  role: UserAccountType
  phone: string

  constructor(props) {
    this._id = props._id
    this.login = props.login
    this.email = props.email
    this.role = props.role
    this.phone = props.phone
  }

  getUserInfo(): IUser {
    return {
      _id: this._id,
      login: this.login,
      email: this.email,
      role: this.role,
      phone: this.phone,
    }
  }
}

class UserTeacher implements ITeacherUser {
  _id: string
  login: string
  email: string
  role: UserAccountType
  city: string
  state: string
  country: string
  phone: string
  address: string
  education: string[]
  work_experience: string[]
  
  constructor(props: ITeacherUser) {
    this._id = props._id
    this.login = props.login
    this.email = props.email
    this.role = props.role
    this.city = props.city
    this.state = props.state
    this.country = props.country
    this.phone = props.phone
    this.address = props.address
    this.education = props.education
    this.work_experience = props.work_experience
  }

  getUserInfo() {
    console.log(this)
    return this
  }
}

class UserCompany implements ICompanyUser {
  _id: string
  login: string
  email: string
  role: UserAccountType
  city: string
  state: string
  country: string
  phone: string
  company_name: string
  inn_code: string
  legal_address: string
  mailing_address: string

  constructor(props: ICompanyUser) {
    this._id = props._id
    this.login = props.login
    this.email = props.email
    this.role = props.role
    this.phone = props.phone
    this.city = props.city
    this.state = props.state
    this.company_name = props.company_name
    this.inn_code = props.inn_code
    this.legal_address = props.legal_address
    this.mailing_address = props.mailing_address
  }

  getUserInfo() {
    console.log(this)
    return this
  }
}

class UserFabric {
  type: UserAccountType

  constructor(type) {
    this.type = type
  }
  
  create(payload) {
    if (this.type === 'student') {
      const user = new User(payload as IUser)
      return user.getUserInfo()
    }
    if (this.type === 'teacher') {
      const user = new UserTeacher(payload as ITeacherUser)
      return user.getUserInfo()
    }
    if (this.type === 'company') {
      const user = new UserCompany(payload as ICompanyUser)
      return user.getUserInfo()
    }
    return null
  }
}

export default UserFabric