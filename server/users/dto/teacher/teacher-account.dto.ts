import { UserRoleType } from '../../../types/common'
import { ITeacherAccount } from '../../interfaces/teacher.interface'
import UserDto from '../user.dto'

class TeacherAccountDto extends UserDto {
  fullname: string

  constructor(props: ITeacherAccount) {
    super(props)
    this.fullname = props.fullname
  }

  getUserInfo() {
    return {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
      login: this.login,
      phone: this.phone || null,
      role: this.role,
    }
  }
}

export default TeacherAccountDto
