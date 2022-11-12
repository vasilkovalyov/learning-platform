import { IStudent } from '../interfaces/student.interface'
import UserDto from './user.dto'

class StudentDto extends UserDto {
  constructor(data: IStudent) {
    super(data)
  }

  getAuthDataUser() {
    return {
      _id: this._id,
      email: this.email,
      login: this.login,
      phone: this.phone,
      role: this.role,
    }
  }
}

export default StudentDto