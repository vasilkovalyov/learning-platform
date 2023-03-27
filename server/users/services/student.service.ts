import { ISignUpUserResponse } from '../../interfaces/auth-user.interface'
import { IStudentPrivateData, IStudentPrivateDataRequest, IStudentSignUp } from '../interfaces/student.interface'
import { IStudentAccount, IStudentExtended } from '../interfaces/student.interface'
import { signUpStudentValidation } from '../validation/student.validation'
import ApiError from '../../exeptions/api.exeptions'
import RoleModel from '../../models/role.model'
import bcrypt from 'bcryptjs'

import { StudentModel } from '../models/student/common.student'
import { StudentPrivateDataModel } from '../models/student/private-data.student'
import { UserRoleType } from '../../types/common'

class StudentService {
  async signUp(params: IStudentSignUp): Promise<ISignUpUserResponse> {
    const role: UserRoleType = 'student'
    const { error } = signUpStudentValidation(params)

    if (error) throw ApiError.BadRequest(error.details[0].message)

    const { email, confirm_password } = params
    const userExist = await StudentModel.findOne({ email: email })

    if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`)

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10))

    const studentModel = new StudentModel({
      ...params,
      password: hashedPassword,
      role: role,
    })

    const savedUser = await studentModel.save()
    const roleModel = new RoleModel({ _id: savedUser._id, role: role, email: email })
    await roleModel.save()

    const studentPrivateDataModel = new StudentPrivateDataModel({ user: savedUser._id })
    await studentPrivateDataModel.save()

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

  async updateUserAccount({
    _id,
    email,
    fullname,
    phone,
  }: Omit<IStudentAccount, 'password' | 'role' | 'login'>): Promise<IStudentAccount> {
    if (!_id) throw ApiError.BadRequest(`_id is empty!`)

    const data: IStudentAccount | null = await StudentModel.findOneAndUpdate(
      { _id: _id },
      {
        email: email,
        fullname: fullname,
        phone: phone,
      },
      { new: true },
    )

    if (!data) throw ApiError.BadRequest('Student doesn`t update')

    return {
      _id: data?._id,
      email: data?.email,
      fullname: data?.fullname,
      login: data?.login,
      role: data?.role,
      phone: data?.phone,
    }
  }
  async updateUserPrivateData(props: IStudentPrivateDataRequest) {
    const data: IStudentPrivateData | null = await StudentPrivateDataModel.findOneAndUpdate(
      { user: props._id },
      {
        country: props.country,
        about_info: props.about_info,
        address: props.address,
        city: props.city,
        state: props.state,
        subjects_learning: props.subjects_learning,
      },
      { new: true },
    )

    if (!data) throw ApiError.BadRequest('Student private data doesn`t update')

    return {
      country: data.country,
      about_info: data.about_info,
      address: data.address,
      city: data.city,
      state: data.state,
      subjects_learning: data.subjects_learning,
    }
  }

  async getUserPrivateData(id: string) {
    const data = await StudentPrivateDataModel.findOne({ user: id })
    if (!data) throw ApiError.BadRequest(`Student private data doesnt find by id - ${id}`)
    return {
      country: data.country,
      about_info: data.about_info,
      address: data.address,
      city: data.city,
      state: data.state,
      subjects_learning: data.subjects_learning,
    }
  }

  async removeUser(id: string) {
    const data = await StudentModel.findOneAndDelete({ _id: id })
    if (!data) throw ApiError.BadRequest(`Student doesn't find by id ${id}!`)
    await StudentPrivateDataModel.findOneAndDelete({ user: id })
    await RoleModel.findOneAndDelete({ _id: id })
    return {
      message: 'Student has been removed success',
    }
  }
}

export default new StudentService()
