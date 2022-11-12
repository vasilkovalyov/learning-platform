import { RoleType } from '../../../types/common'
import { IStudent } from '../interfaces/student.interface'

abstract class UserDto implements IStudent {
  _id: string
  login: string
  email: string
  role: RoleType
  phone?: string | undefined
  
  constructor(data: IStudent) {
    this._id = data._id
    this.email = data.email
    this.login = data.login
    this.phone = data.phone
    this.role = data.role
  }

  abstract getAuthDataUser()
}

export default UserDto