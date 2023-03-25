import { IAuthUserResponse, ISignUpUserResponse } from '../../interfaces/auth-user.interface'
import { ITeacherSignUp } from '../interfaces/teacher.interface'
import { ITeacherPrivateData, ITeacherAccount, ITeacherExtended } from '../interfaces/teacher.interface'
import { signUpTeacherValidation } from '../validation/teacher.validation'
import ApiError from '../../exeptions/api.exeptions'
import RoleModel from '../../models/role.model'
import bcrypt from 'bcryptjs'

import {
  TeacherBaseInfoModel,
  TeacherPrivateDataModel,
  TeacherServicesModel,
  TeacherLessonsModel,
} from '../models/teacher'

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
      education,
      phone,
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

    const teacherPrivateDataModel = new TeacherPrivateDataModel({
      teacher: savedUser._id,
      address,
      city,
      state,
      country,
      education,
      work_experience,
    })

    await teacherPrivateDataModel.save()

    const teacherServicesModel = new TeacherServicesModel({ teacher: savedUser._id })
    const teacherLessonsModel = new TeacherLessonsModel({ teacher: savedUser._id })

    await teacherServicesModel.save()
    await teacherLessonsModel.save()

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
    const lessonsData = await TeacherLessonsModel.findOne({ teacher: id })
    const servicesData = await TeacherServicesModel.findOne({ teacher: id })

    return {
      _id: id,
      lessons: lessonsData,
      private_data: privateData,
      services: servicesData,
    }
  }

  async updateUserPrivateData(params: ITeacherPrivateData) {
    const privateData = await TeacherPrivateDataModel.findOneAndUpdate(
      { teacher: params._id },
      {
        address: params.private_data?.address,
        city: params.private_data?.city,
        state: params.private_data?.state,
        country: params.private_data?.country,
        education: params.private_data?.education,
        work_experience: params.private_data?.work_experience,
        certificates: params.private_data?.certificates,
        local_time: params.private_data?.local_time,
        about_info: params.private_data?.about_info,
      },
      { new: true },
    )
    const lessonsData = await TeacherLessonsModel.findOneAndUpdate(
      { teacher: params._id },
      {
        lesson_1: params.lessons?.lesson_1,
        lesson_5: params.lessons?.lesson_5,
        lesson_10: params.lessons?.lesson_10,
        lesson_20: params.lessons?.lesson_20,
        lesson_duration: params.lessons?.lesson_duration,
      },
      { new: true },
    )
    const servicesData = await TeacherServicesModel.findOneAndUpdate(
      { teacher: params._id },
      {
        lang_speaking: params.services?.lang_speaking,
        students_ages: params.services?.students_ages,
        lang_teaching: params.services?.lang_teaching,
        subjects: params.services?.subjects,
        levels_studying: params.services?.levels_studying,
        speaking_accent: params.services?.speaking_accent,
        lesson_content: params.services?.lesson_content,
        tests: params.services?.tests,
      },
      { new: true },
    )

    return {
      _id: params._id,
      lessons: lessonsData,
      private_data: privateData,
      services: servicesData,
    }
  }

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
    const data = await TeacherBaseInfoModel.find({ _id: id }).remove()
    await TeacherPrivateDataModel.find({ _id: id }).remove()
    await TeacherServicesModel.find({ _id: id }).remove()
    await TeacherLessonsModel.find({ _id: id }).remove()
    await RoleModel.find({ _id: id }).remove()
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
