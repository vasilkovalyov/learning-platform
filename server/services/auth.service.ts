import { IStudent } from '../users/interfaces/student.interface'
import { IFormUser, IFormTeacher, IAuthUserResponse } from '../interfaces/auth.interface'
import RoleModel from '../models/role.model'
import PendingModel from '../models/pending-user.model'
import { signInValidation } from '../validation/auth.validation'
import TokenService from './token.service'
import ApiError from '../exeptions/api.exeptions'
import { UserAccountType } from '../types/common'
import bcrypt from 'bcryptjs'

import StudentService from '../users/services/student.service'
import TeacherService from '../users/services/teacher.service'

import StudentDto from '../users/dto/student.dto'
import TeacherDto from '../users/dto/teacher.dto'

type AuthTypeForm = Pick<IFormUser, 'email' | 'password'>

class AuthService {
  // async activateUser(hash: string) {
  //     const user = await PendingModel.findOne({ _id: hash });
  //     if (!user) throw ApiError.BadRequest(`This activation link already enabled`);
  //     await this.saveRole(user._id, user.role, user.email)

  //     if (user.role as UserAccountType === 'student') {
  //         const newUser = new StudentModel({
  //             login: user.login,
  //             email: user.email,
  //             password: user.password,
  //             role: user.role
  //         });
  //         await newUser.save()
  //     }
  //     if (user.role as UserAccountType === 'teacher') {

  //     }
  //     if (user.role as UserAccountType === 'company') {

  //     }
  //     await user.remove();

  //     return {
  //         message: `User ${hash} has been activated`,
  //         data: null
  //     }
  // }

  async signIn(params: AuthTypeForm): Promise<IAuthUserResponse<IFormUser | IFormTeacher | null>> {
    const { error } = signInValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message)

    const { email, password } = params
    const findedRole = await RoleModel.findOne({ email: email })
    const pendingRole = await PendingModel.findOne({ email: email })
    if (pendingRole === null && findedRole === null) throw ApiError.BadRequest(`User with email - ${email} not exist!`)
    let userResponse: IStudent | any
    let userDto: any
    if (findedRole && (findedRole.role as UserAccountType) === 'student') {
      userResponse = await StudentService.getUserByEmail(email)
      userDto = new StudentDto(userResponse).getAuthDataUser()
    }
    if (findedRole && (findedRole.role as UserAccountType) === 'teacher') {
      userResponse = await TeacherService.getUserByEmail(email)
      userDto = new TeacherDto(userResponse).getAuthDataUser()
    }

    const validPass = await bcrypt.compare(password, userResponse.password)
    if (!validPass) throw ApiError.BadRequest(`Wrong password!`)
    const token = await TokenService.generateTokens({ _id: userResponse._id.valueOf(), role: userResponse.role })
    return {
      data: userDto,
      message: `Succsess user signin ${userDto.login}`,
      token: token.accessToken,
    }
  }
}

export default new AuthService()
