import { ISignUpUserResponse } from '../../interfaces/auth-user.interface'
import { IStudentSignUp } from '../interfaces/student.interface'
import { IStudentAccount, IStudentExtended } from '../interfaces/student.interface'
import { signUpStudentValidation } from '../validation/student.validation'
import ApiError from '../../exeptions/api.exeptions'
import RoleModel from '../../models/role.model'
import bcrypt from 'bcryptjs'
import { StudentModel } from '../models/student/common.student'

class StudentService {
  async signUp(params: IStudentSignUp): Promise<ISignUpUserResponse> {
    const { error } = signUpStudentValidation(params)

    if (error) throw ApiError.BadRequest(error.details[0].message)

    const { email, role, confirm_password } = params
    const userExist = await StudentModel.findOne({ email: email })

    if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`)

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10))

    const studentModel = new StudentModel({
      ...params,
      password: hashedPassword,
    })

    const savedUser = await studentModel.save()
    const roleModel = new RoleModel({ _id: savedUser._id, role: role, email: email })
    await roleModel.save()

    return {
      message: `You have been registered`,
      user: {
        _id: savedUser._id.toString(),
        email: savedUser.email,
      },
    }
  }

  async getUserByEmail(email: string): Promise<IStudentExtended> {
    const data: IStudentExtended | null = await StudentModel.findOne({ email: email })
    if (!data) throw ApiError.BadRequest(`Student doesn't find by email ${email}!`)
    return data
  }

  async getUserById(id: string): Promise<IStudentAccount> {
    const data: IStudentExtended | null = await StudentModel.findOne({ _id: id })
    if (!data) throw ApiError.BadRequest(`Student doesn't find by id ${id}!`)
    return {
      _id: data._id,
      email: data.email,
      fullname: data.fullname,
      login: data.login,
      role: data.role,
      phone: data.phone,
    }
  }

  async removeUser(id: string) {
    const data = await StudentModel.find({ _id: id }).remove()
    await RoleModel.find({ _id: id }).remove()
    if (!data) throw ApiError.BadRequest(`Student doesn't find by id ${id}!`)
  }
}

export default new StudentService()
