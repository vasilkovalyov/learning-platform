import { ITeacherUser } from '../interfaces/teacher.interface'
import UserDto from './user.dto'

class TeacherDto extends UserDto {
  address: string
  education: string[]
  work_experience: string[]
  city: string
  state: string
  country: string

  constructor(data: ITeacherUser) {
    super(data)
    this.address = data.address
    this.education = data.education
    this.work_experience = data.work_experience
    this.city = data.city
    this.state = data.state
    this.country = data.country
  }

  getAuthDataUser() {
    return {
      _id: this._id,
      email: this.email,
      login: this.login,
      phone: this.phone,
      role: this.role,
      address: this.address,
      education: this.education,
      work_experience: this.work_experience,
      city: this.city,
      state: this.state,
      country: this.country
    }
  }
}

export default TeacherDto