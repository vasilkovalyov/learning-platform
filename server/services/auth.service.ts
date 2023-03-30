import { IAuthUserResponse } from '../interfaces/auth-user.interface'

import RoleModel from '../models/role.model'
import {
  IStudentAccountDataProps,
  IStudentModel,
  IStudentAccountDataPropsResponse,
} from '../models/student/student-account.model'
import { ITeacherModel, ITeacherAccountDataPropsResponse } from '../models/teacher/teacher-account.model'
import { signInValidation } from '../validation/auth.validation'
import TokenService from './token.service'
import ApiError from '../exeptions/api.exeptions'
import bcrypt from 'bcryptjs'

import studentService from '../services/student.service'
import teacherService from '../services/teacher.service'

class AuthService {
  validateUserSignIn(params: { email: string; password: string }): void {
    const { error } = signInValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message)
  }

  private async validatePassword(password, userPassword) {
    const validPass = await bcrypt.compare(password, userPassword)
    if (!validPass) throw ApiError.BadRequest(`Wrong password!`)
  }

  async signIn(params): Promise<IAuthUserResponse<IStudentAccountDataProps | null>> {
    this.validateUserSignIn(params)

    const { email, password } = params
    const findedRole = await RoleModel.findOne({ email: email })
    if (findedRole === null) throw ApiError.BadRequest(`User with email - ${email} not exist!`)

    let userResponse: IStudentModel | ITeacherModel | null | any = null
    let userDto: IStudentAccountDataPropsResponse | ITeacherAccountDataPropsResponse | null = null

    if (findedRole.role === 'student') {
      userResponse = await studentService.getUserByEmail(email)
      if (userResponse)
        userDto = {
          _id: userResponse._id,
          email: userResponse.email,
          fullname: userResponse.fullname,
          login: userResponse.login,
          role: userResponse.role,
          phone: userResponse.phone,
          date: userResponse.date,
        }
    }

    if (findedRole.role === 'teacher') {
      userResponse = await teacherService.getUserByEmail(email)
      if (userResponse) {
        userDto = {
          _id: userResponse._id,
          email: userResponse.email,
          fullname: userResponse.fullname,
          login: userResponse.login,
          role: userResponse.role,
          phone: userResponse.phone,
          date: userResponse.date,
        }
      }
    }

    if (!userResponse) throw ApiError.BadRequest(`User not found!`)
    this.validatePassword(password, userResponse.password)

    const token = await TokenService.generateTokens({ _id: userResponse._id.valueOf(), role: userResponse.role })
    return {
      user: userDto || null,
      message: `Succsess user signin ${userDto && userDto.login}`,
      token: token.accessToken,
    }
  }
}

export default new AuthService()
