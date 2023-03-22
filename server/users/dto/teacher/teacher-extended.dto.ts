import { ITeacherExtended } from '../../interfaces/teacher.interface'
import TeacherAccountDto from './teacher-account.dto'

class TeacherExtendedDto extends TeacherAccountDto {
  password: string

  constructor(props: ITeacherExtended) {
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

export default TeacherExtendedDto
