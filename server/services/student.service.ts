import bcrypt from 'bcryptjs'

import ApiError from '../exeptions/api.exeptions'
import { signUpStudentValidation } from '../validation/student/student-account.validaton'
import roleService from './role.service'

import RoleModel, { IUserRoleType } from '../models/role.model'
import StudentModel, {
  IStudentSignUpProps,
  IStudentAccountDataPropsResponse,
  IStudentModel,
  IStudentAccountUpdateProps,
} from '../models/student/student-account.model'
import StudentPrivateDataModel, { IStudentPrivateDataModel } from '../models/student/student-prvate-data.model'

interface StudentResponse {
  message: string
  user?: {
    id: string
    email: string
  } | null
}

class StudentService {
  async signUp(params: IStudentSignUpProps): Promise<StudentResponse> {
    const role: IUserRoleType = 'student'

    const { error } = signUpStudentValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message)

    const { email, confirm_password } = params
    const userExist = await StudentModel.findOne({ email: email })
    if (userExist) throw ApiError.BadRequest(`Student with email - ${email} alreary exist!`)

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10))
    const studentModel = new StudentModel({
      ...params,
      password: hashedPassword,
      role: role,
    })
    const savedUser = await studentModel.save()

    roleService.saveRole(savedUser._id.toString(), email, role)

    const studentPrivateDataModel = new StudentPrivateDataModel({
      user: savedUser._id,
      subjects_learning: [],
      about_info: '',
      address: '',
      city: '',
      country: '',
      state: '',
    })
    await studentPrivateDataModel.save()

    return {
      message: `You have been registered`,
      user: {
        id: savedUser._id.toString(),
        email: savedUser.email,
      },
    }
  }

  async getUserByEmail(email: string): Promise<IStudentModel> {
    const response: IStudentModel | null = await StudentModel.findOne({ email: email })
    if (!response) throw ApiError.BadRequest(`Student doesn't find by email ${email}!`)
    return response
  }

  async getUserAccountById(id: string): Promise<IStudentAccountDataPropsResponse> {
    const response = await StudentModel.findOne({ _id: id })
    if (!response) throw ApiError.BadRequest(`Student with id - ${id} doesn't find !`)

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

  async getUserPrivateDataById(id: string): Promise<IStudentPrivateDataModel> {
    const response: IStudentPrivateDataModel | null = await StudentPrivateDataModel.findOne({ user: id })
    if (!response) throw ApiError.BadRequest(`Student private data with id - ${id} doesn't find !`)
    return response
  }

  async updateUserAccount({
    _id,
    login,
    fullname,
    phone,
  }: IStudentAccountUpdateProps): Promise<IStudentAccountUpdateProps> {
    if (!_id) throw ApiError.BadRequest(`_id is empty!`)

    const response: IStudentAccountUpdateProps | null = await StudentModel.findOneAndUpdate(
      { _id: _id },
      {
        login: login,
        fullname: fullname,
        phone: phone,
      },
      { new: true },
    )

    if (!response) throw ApiError.BadRequest('Student doesn`t update')

    return {
      _id: response._id,
      login: response.login,
      fullname: response.fullname,
      phone: response.phone,
      date: response.date,
    }
  }

  async updateUserPrivateData(props: IStudentPrivateDataModel): Promise<IStudentPrivateDataModel> {
    const response: IStudentPrivateDataModel | null = await StudentPrivateDataModel.findOneAndUpdate(
      { user: props.user },
      {
        ...props,
      },
      { new: true },
    )

    if (!response) throw ApiError.BadRequest('Student private data doesn`t update')

    return response
  }

  async deleteUserById(id: string): Promise<StudentResponse> {
    const response = await StudentModel.findOneAndDelete({ _id: id })
    if (!response) throw ApiError.BadRequest('Student account data doesn`t delete')
    await StudentPrivateDataModel.findOneAndDelete({ user: id })
    await RoleModel.findOneAndDelete({ _id: id })

    return {
      message: `You have been deleted`,
      user: null,
    }
  }
}

export default new StudentService()
