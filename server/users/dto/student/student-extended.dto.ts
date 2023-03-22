import { IStudentExtended } from '../../interfaces/student.interface'
import StudentAccountDto from './student-account.dto'

class StudentExtendedDto extends StudentAccountDto {
  password: string

  constructor(props: IStudentExtended) {
    super(props)
    this.password = props.password
  }

  getUserInfo() {
    return {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
      login: this.login,
      phone: this.phone || null,
      role: this.role,
      password: this.password,
    }
  }
}

export default StudentExtendedDto
