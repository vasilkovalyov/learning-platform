import { RoleType } from '../../../types/common'
import { IUser } from '../interfaces/user.interface'

abstract class UserDto implements IUser {
  _id: string
  login: string
  email: string
  role: RoleType
  phone?: string
  
  constructor(data: IUser) {
    this._id = data._id
    this.email = data.email
    this.login = data.login
    this.phone = data.phone || ''
    this.role = data.role
  }

  abstract getAuthDataUser()
}

export default UserDto