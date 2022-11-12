import { IStudent } from '../interfaces/student.interface'
import UserDto from './user.dto'

class StudentDto extends UserDto {
  fullname: string

  constructor(data: IStudent) {
    super(data)
    this.fullname = data.fullname
  }

  getAuthDataUser() {
    return {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
      login: this.login,
      phone: this.phone || '',
      role: this.role,
    }
  }
}

export default StudentDto