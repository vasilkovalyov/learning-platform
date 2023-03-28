import { ISignUpUserResponse } from '../../interfaces/auth-user.interface'
import { ITeacherEducation, ITeacherSignUp, ITeacherWorkExperience } from '../interfaces/teacher.interface'
import { ITeacherPrivateData, ITeacherAccount, ITeacherExtended } from '../interfaces/teacher.interface'
import { signUpTeacherValidation } from '../validation/teacher.validation'
import ApiError from '../../exeptions/api.exeptions'
import RoleModel from '../../models/role.model'
import bcrypt from 'bcryptjs'

import { TeacherBaseInfoModel, TeacherPrivateDataModel, TeacherServicesModel } from '../models/teacher'

import { UserRoleType } from '../../types/common'

class TeacherService {
  async signUp(params: ITeacherSignUp): Promise<ISignUpUserResponse> {
    const role: UserRoleType = 'teacher'
    const { error } = signUpTeacherValidation(params)

    if (error) throw ApiError.BadRequest(error.details[0].message)

    const {
      fullname,
      login,
      email,
      confirm_password,
      address,
      city,
      state,
      country,
      phone,
      education,
      work_experience,
    } = params
    const userExist = await RoleModel.findOne({ email: email })

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10))
    if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`)

    const teacherBaseInfoModel = new TeacherBaseInfoModel({
      fullname,
      login,
      email,
      password: hashedPassword,
      phone,
      role,
    })

    const savedUser: typeof teacherBaseInfoModel = await teacherBaseInfoModel.save()

    const educationArray = education.map<ITeacherEducation>((item: string) => {
      return {
        university_name: item,
      }
    })
    const workExperienceArray = work_experience.map<ITeacherWorkExperience>((item: string) => {
      return {
        company_name: item,
      }
    })

    const teacherPrivateDataModel = new TeacherPrivateDataModel({
      teacher: savedUser._id,
      address,
      city,
      state,
      country,
      education: educationArray,
      work_experience: workExperienceArray,
    })

    await teacherPrivateDataModel.save()

    const teacherServicesModel = new TeacherServicesModel({ teacher: savedUser._id })

    await teacherServicesModel.save()

    const roleModel = new RoleModel({ _id: savedUser._id, role, email })
    await roleModel.save()

    return {
      message: `You have been registered`,
      user: {
        _id: savedUser._id.toString(),
        email: savedUser.email || '',
      },
    }
  }

  async getUserByEmail(email: string): Promise<ITeacherExtended | null> {
    const data: ITeacherExtended | null = await TeacherBaseInfoModel.findOne({ email: email })
    if (!data) throw ApiError.BadRequest(`Teacher doesn't find by email ${email}!`)
    return data
  }

  async getUserById(id: string): Promise<ITeacherAccount | null> {
    const data: ITeacherExtended | null = await TeacherBaseInfoModel.findOne({ _id: id })
    if (data === null) return null
    return {
      _id: data._id,
      email: data.email,
      fullname: data.fullname,
      login: data.login,
      role: data.role,
      phone: data.phone,
    }
  }

  async getUserPrivateData(id: string): Promise<ITeacherPrivateData> {
    const privateData = await TeacherPrivateDataModel.findOne({ teacher: id })
    if (!privateData) throw ApiError.BadRequest(`Teacher private data doesnt find by id - ${id}`)

    const servicesData = await TeacherServicesModel.findOne({ teacher: id })
    if (!servicesData) throw ApiError.BadRequest(`Teacher servces data doesnt find by id - ${id}`)

    return {
      _id: privateData.teacher,
      private_data: privateData,
      services: servicesData,
    }
  }

  async updateUserPrivateData(params: ITeacherPrivateData) {}

  async updateUserAuthData(params: ITeacherAccount) {
    const role = await RoleModel.findById(params._id)
    if (role?.email !== params.email) {
      await RoleModel.findByIdAndUpdate(
        { _id: role?._id },
        {
          email: params.email,
        },
        { new: true },
      )
    }
    const authData = await TeacherBaseInfoModel.findOneAndUpdate(
      { _id: params._id },
      {
        email: params.email,
        fullname: params.fullname,
        login: params.login,
        phone: params.phone,
        role: params.role,
      },
      { new: true },
    )
    return {
      data: {
        ...authData,
      },
    }
  }

  async removeUser(id: string) {
    const data = await TeacherBaseInfoModel.findOneAndDelete({ _id: id })
    await TeacherPrivateDataModel.findOneAndDelete({ teacher: id })
    await TeacherServicesModel.findOneAndDelete({ teacher: id })
    await RoleModel.findOneAndDelete({ _id: id })
    if (!data) throw ApiError.BadRequest(`Teacher doesn't find by id ${id}!`)
  }

  async updateUserAccount({
    _id,
    email,
    fullname,
    phone,
  }: Omit<ITeacherAccount, 'password' | 'role' | 'login'>): Promise<ITeacherAccount> {
    if (!_id) throw ApiError.BadRequest(`_id is empty!`)

    const data: ITeacherAccount | null = await TeacherBaseInfoModel.findOneAndUpdate(
      { _id: _id },
      {
        email: email,
        fullname: fullname,
        phone: phone,
      },
      { new: true },
    )

    if (!data) throw ApiError.BadRequest('Teacher doesn`t update')

    return {
      _id: data?._id,
      email: data?.email,
      fullname: data?.fullname,
      login: data?.login,
      role: data?.role,
      phone: data?.phone,
    }
  }
}

export default new TeacherService()
