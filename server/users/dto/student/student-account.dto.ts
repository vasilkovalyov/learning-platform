import { IStudentAccount } from '../../interfaces/student.interface'
import UserDto from '../user.dto'

class StudentAccountDto extends UserDto {
  fullname: string

  constructor(props: IStudentAccount) {
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

export default StudentAccountDto
