import bcrypt from 'bcryptjs'

import ApiError from '../exeptions/api.exeptions'
import { signUpTeacherValidation } from '../validation/teacher/teacher-account.validaton'
import roleService from './role.service'

import RoleModel, { IUserRoleType } from '../models/role.model'
import TeacherModel, {
  ITeacherAccountDataPropsResponse,
  ITeacherModel,
  ITeacherAccountUpdateProps,
} from '../models/teacher/teacher-account.model'

import TeacherPrivateDataModel, {
  ITeacherPrivateDataModel,
  IWorkExperienceProps,
  IEducationProps,
} from '../models/teacher/teacher-prvate-data.model'

import TeacherServiceModel, { ITeacherServiceModel } from '../models/teacher/teacher-service.model'

interface TeacherResponse {
  message: string
  user?: {
    id: string
    email: string
  } | null
}

type TeacherSignUpBaseType = Omit<ITeacherModel, 'date' | 'role' | '_id'>
type TeacherSignUpPrivateDataType = Omit<
  ITeacherPrivateDataModel,
  '_id' | 'user' | 'about_info' | 'work_experience' | 'education'
>

export type ITeacherSignUpProps = TeacherSignUpBaseType &
  TeacherSignUpPrivateDataType & {
    work_experience: string[]
    education: string[]
    confirm_password: string
  }

class TeacherService {
  async signUp(params: ITeacherSignUpProps): Promise<TeacherResponse> {
    const role: IUserRoleType = 'teacher'
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

    const teacherModel = new TeacherModel({
      fullname,
      login,
      email,
      password: hashedPassword,
      phone,
      role,
    })

    const savedUser: ITeacherModel = await teacherModel.save()

    const educationArray = education.map((item) => {
      return {
        university_name: item,
      }
    })

    const workExperienceArray = work_experience.map((item) => {
      return {
        company_name: item,
      }
    })

    const teacherPrivateDataModel = new TeacherPrivateDataModel({
      user: savedUser._id,
      address,
      city,
      state,
      country,
      education: educationArray,
      work_experience: workExperienceArray,
    })

    await teacherPrivateDataModel.save()

    const teacherServiceModel = new TeacherServiceModel({
      user: savedUser._id,
      lang_speaking: [],
      lang_teaching: [],
      levels_studying: [],
      Teachers_ages: [],
      subjects: [],
      lesson_duration: null,
      lessons: [],
    })

    await teacherServiceModel.save()

    const roleModel = new RoleModel({ _id: savedUser._id, role, email })
    await roleModel.save()

    return {
      message: `You have been registered`,
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    }
  }

  async getUserByEmail(email: string): Promise<ITeacherModel> {
    const response: ITeacherModel | null = await TeacherModel.findOne({ email: email })
    if (!response) throw ApiError.BadRequest(`Teacher doesn't find by email ${email}!`)
    return response
  }

  async getUserAccountById(id: string): Promise<ITeacherAccountDataPropsResponse> {
    const response = await TeacherModel.findOne({ _id: id })
    if (!response) throw ApiError.BadRequest(`Teacher with id - ${id} doesn't find !`)

    return {
      _id: response.id,
      date: response.date,
      email: response.email,
      fullname: response.fullname,
      login: response.login,
      phone: response.phone,
      role: response.role,
    }
  }

  async getUserPrivateDataById(id: string): Promise<ITeacherPrivateDataModel> {
    const response: ITeacherPrivateDataModel | null = await TeacherPrivateDataModel.findOne({ user: id })
    if (!response) throw ApiError.BadRequest(`Teacher private data with id - ${id} doesn't find !`)
    return response
  }

  async updateUserAccount({
    _id,
    login,
    fullname,
    phone,
  }: ITeacherAccountUpdateProps): Promise<ITeacherAccountUpdateProps> {
    if (!_id) throw ApiError.BadRequest(`_id is empty!`)

    const response: ITeacherAccountUpdateProps | null = await TeacherModel.findOneAndUpdate(
      { _id: _id },
      {
        login: login,
        fullname: fullname,
        phone: phone,
      },
      { new: true },
    )

    if (!response) throw ApiError.BadRequest('Teacher doesn`t update')

    return {
      _id: response._id,
      login: response.login,
      fullname: response.fullname,
      phone: response.phone,
      date: response.date,
    }
  }

  async updateUserPrivateData(props: ITeacherPrivateDataModel): Promise<ITeacherPrivateDataModel> {
    const response: ITeacherPrivateDataModel | null = await TeacherPrivateDataModel.findOneAndUpdate(
      { user: props.user },
      {
        ...props,
      },
      { new: true },
    )

    if (!response) throw ApiError.BadRequest('Teacher private data doesn`t update')

    return response
  }

  async deleteUserById(id: string): Promise<TeacherResponse> {
    const response = await TeacherModel.findOneAndDelete({ _id: id })
    if (!response) throw ApiError.BadRequest('Teacher account data doesn`t delete')
    await TeacherPrivateDataModel.findOneAndDelete({ user: id })
    await RoleModel.findOneAndDelete({ _id: id })

    return {
      message: `You have been deleted`,
      user: null,
    }
  }
}

export default new TeacherService()
