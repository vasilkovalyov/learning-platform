import { ITeacherUser } from '../interfaces/teacher.interface'
import UserDto from './user.dto'

class TeacherDto extends UserDto {
  fullname: string

  constructor(data: ITeacherUser) {
    super(data)
    this.fullname = data.fullname
  }

  getAuthDataUser() {
    return {
      _id: this._id,
      fullname: this.fullname,
      email: this.email, 
      login: this.login,
      phone: this.phone,
      role: this.role,
    }
  }
}

export default TeacherDto