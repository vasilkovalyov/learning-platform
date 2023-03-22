import { RoleType } from '../../../types/common'
import { IUser } from '../interfaces/user.interface'

abstract class UserDto implements IUser {
  _id: string
  login: string
  email: string
  role: RoleType
  phone?: string | null

  constructor(data: IUser) {
    this._id = data._id
    this.email = data.email
    this.login = data.login
    this.phone = data.phone || null
    this.role = data.role
  }

  abstract getUserInfo()
}

export default UserDto
