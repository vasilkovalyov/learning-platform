import { UserRoleType } from '../../../types/common'
import { ITeacherSignUp } from '../../../interfaces/auth-teacher.interface'

class TeacherSignUpDto {
  fullname: string
  login: string
  password: string
  confirm_password: string
  email: string
  role: UserRoleType

  constructor(props: ITeacherSignUp) {
    this.fullname = props.fullname
    this.login = props.login
    this.password = props.password
    this.confirm_password = props.confirm_password
    this.email = props.email
    this.role = props.role
  }
}

export default TeacherSignUpDto
