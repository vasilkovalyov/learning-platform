import { IAuthUserResponse } from '../interfaces/auth-user.interface'

import RoleModel from '../models/role.model'
import { signInValidation } from '../validation/auth.validation'
import TokenService from './token.service'
import ApiError from '../exeptions/api.exeptions'
import bcrypt from 'bcryptjs'

import StudentService from '../users/services/student.service'
import TeacherService from '../users/services/teacher.service'

import StudentAccountDto from '../users/dto/student/student-account.dto'
import TeacherAccountDto from '../users/dto/teacher/teacher-account.dto'

import { IStudentAccount, IStudentExtended } from '../users/interfaces/student.interface'
import { ITeacherAccount, ITeacherExtended } from '../users/interfaces/teacher.interface'

class AuthService {
  validateUserSignIn(params: { email: string; password: string }): void {
    const { error } = signInValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message)
  }

  private async validatePassword(password, userPassword) {
    const validPass = await bcrypt.compare(password, userPassword)
    if (!validPass) throw ApiError.BadRequest(`Wrong password!`)
  }

  async signIn(params: {
    email: string
    password: string
  }): Promise<IAuthUserResponse<IStudentAccount | ITeacherAccount | null>> {
    this.validateUserSignIn(params)

    const { email, password } = params

    const findedRole = await RoleModel.findOne({ email: email })
    if (findedRole === null) throw ApiError.BadRequest(`User with email - ${email} not exist!`)

    let userResponse: IStudentExtended | ITeacherExtended | null = null
    let userDto: IStudentAccount | ITeacherAccount | null = null

    if (findedRole.role === 'student') {
      userResponse = await StudentService.getUserByEmail(email)
      if (userResponse) userDto = new StudentAccountDto(userResponse).getUserInfo()
    }
    if (findedRole.role === 'teacher') {
      userResponse = await TeacherService.getUserByEmail(email)
      if (userResponse) userDto = new TeacherAccountDto(userResponse).getUserInfo()
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
