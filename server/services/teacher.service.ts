import bcrypt from 'bcryptjs'

import ApiError from '../exeptions/api.exeptions'
import { signUpTeacherValidation } from '../validation/teacher/teacher-account.validaton'
import { createTeacherGroupLessonValidation } from '../validation/teacher-group-lesson.validation'

import RoleModel, { IUserRoleType } from '../models/role.model'
import TeacherModel, {
  ITeacherAccountPublicProps,
  ITeacherModel,
  ITeacherAccountEditableProps,
} from '../models/teacher/teacher-account.model'

import TeacherPrivateDataModel, {
  ITeacherPrivateDataModel,
  IWorkExperienceProps,
  IEducationProps,
} from '../models/teacher/teacher-prvate-data.model'

import TeacherGroupLessonModel, {
  ITeacherGroupLessonCreateProps,
  ITeacherGroupLessonEditProps,
} from '../models/teacher-group-lesson.model'

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

interface ITeacherCardProps extends Pick<ITeacherModel, '_id' | 'fullname'> {
  privateData: Pick<ITeacherPrivateDataModel, 'country' | 'about_info'>
  services: Pick<ITeacherServiceModel, 'lang_speaking' | 'lang_teaching'>
}

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

    const savedUserPrivateData = await teacherPrivateDataModel.save()

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

    const savedUserService = await teacherServiceModel.save()
    const roleModel = new RoleModel({ user: savedUser._id, role, email })
    await roleModel.save()

    await TeacherModel.findOneAndUpdate(
      {
        _id: savedUser._id,
      },
      {
        privateData: savedUserPrivateData._id,
        services: savedUserService._id,
      },
    )

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

  async getUserAccountById(id: string): Promise<ITeacherAccountPublicProps> {
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

  async getUserPrivateDataById(id: string): Promise<ITeacherPrivateDataModel & ITeacherServiceModel> {
    const responsePrivateData: ITeacherPrivateDataModel | null = await TeacherPrivateDataModel.findOne({ user: id })
    const responseService: ITeacherServiceModel | null = await TeacherServiceModel.findOne({ user: id })
    if (!responsePrivateData || !responseService)
      throw ApiError.BadRequest(`Teacher private data with id - ${id} doesn't find !`)
    return {
      _id: responsePrivateData._id,
      city: responsePrivateData.city,
      state: responsePrivateData.state,
      country: responsePrivateData.country,
      address: responsePrivateData.address,
      about_info: responsePrivateData.about_info,
      education: responsePrivateData.education,
      work_experience: responsePrivateData.work_experience,
      lang_speaking: responseService.lang_speaking,
      lang_teaching: responseService.lang_teaching,
      lesson_duration: responseService.lesson_duration,
      lessons: responseService.lessons,
      lessons_prices: responseService.lessons_prices,
      levels_studying: responseService.levels_studying,
      students_ages: responseService.students_ages,
      subjects: responseService.subjects,
      user: responseService.user,
    }
  }

  async updateUserAccount({
    _id,
    login,
    fullname,
    phone,
  }: ITeacherAccountEditableProps): Promise<ITeacherAccountEditableProps> {
    if (!_id) throw ApiError.BadRequest(`_id is empty!`)

    const response: ITeacherAccountEditableProps | null = await TeacherModel.findOneAndUpdate(
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

  async updateUserPrivateData(
    props: ITeacherPrivateDataModel & ITeacherServiceModel,
  ): Promise<ITeacherPrivateDataModel & ITeacherServiceModel> {
    const responsePrivateData: ITeacherPrivateDataModel | null = await TeacherPrivateDataModel.findOneAndUpdate(
      { user: props.user },
      {
        country: props.country,
        state: props.state,
        city: props.city,
        address: props.address,
        about_info: props.about_info,
        work_experience: props.work_experience,
        education: props.education,
      },
      { new: true },
    )

    if (!responsePrivateData) throw ApiError.BadRequest('Teacher private data doesn`t update')

    const responseService: ITeacherServiceModel | null = await TeacherServiceModel.findOneAndUpdate(
      { user: props.user },
      {
        lessons: props.lessons,
        lesson_duration: props.lesson_duration,
        lang_speaking: props.lang_speaking,
        students_ages: props.students_ages,
        lang_teaching: props.lang_teaching,
        subjects: props.subjects,
        levels_studying: props.levels_studying,
        lessons_prices: props.lessons_prices,
      },
      { new: true },
    )

    if (!responseService) throw ApiError.BadRequest('Teacher private data doesn`t update')

    return {
      _id: responsePrivateData._id,
      city: responsePrivateData.city,
      state: responsePrivateData.state,
      country: responsePrivateData.country,
      address: responsePrivateData.address,
      about_info: responsePrivateData.about_info,
      education: responsePrivateData.education,
      work_experience: responsePrivateData.work_experience,
      lang_speaking: responseService.lang_speaking,
      lang_teaching: responseService.lang_teaching,
      lesson_duration: responseService.lesson_duration,
      lessons: responseService.lessons,
      lessons_prices: responseService.lessons_prices,
      levels_studying: responseService.levels_studying,
      students_ages: responseService.students_ages,
      subjects: responseService.subjects,
      user: responseService.user,
    }
  }

  async deleteUserById(id: string): Promise<TeacherResponse> {
    const response = await TeacherModel.findOneAndDelete({ _id: id })
    if (!response) throw ApiError.BadRequest('Teacher account data doesn`t delete')
    await TeacherPrivateDataModel.findOneAndDelete({ user: id })
    await TeacherServiceModel.findOneAndDelete({ user: id })
    await RoleModel.findOneAndDelete({ user: id })

    return {
      message: `You have been deleted`,
      user: null,
    }
  }

  async getUsers(): Promise<ITeacherCardProps[] | []> {
    const response: ITeacherModel[] | [] = await TeacherModel.find({})
    if (!response.length) return []

    const data: ITeacherCardProps[] | [] = await TeacherModel.find()
      .select('_id fullname')
      .populate('privateData', '_id user country about_info')
      .populate('services', '_id user lang_speaking lang_teaching')

    return data
  }

  async getUserProfileInfo(id: string) {
    const response = await TeacherModel.find({
      _id: id,
    })
      .populate('privateData')
      .populate('services')
      .populate('groupLessons')

    if (!response.length) return {}

    return response[0]
  }

  async createGroupLesson(params: ITeacherGroupLessonCreateProps) {
    const { error } = createTeacherGroupLessonValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message)
    const userId = params.teacher

    const teacherGroupLessonModel = new TeacherGroupLessonModel(params)
    teacherGroupLessonModel.save()

    await TeacherModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { groupLessons: teacherGroupLessonModel._id } },
    )

    return {
      message: 'Group lesson create successfull',
    }
  }

  async deleteGroupLesson(userId: string, lessonId: string) {
    const response = await TeacherGroupLessonModel.findOneAndDelete({ _id: lessonId })
    if (!response) throw ApiError.BadRequest('Teacher Group Lesson data doesn`t delete')

    await TeacherModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $pull: { groupLessons: lessonId } },
    )

    return {
      message: `You have been deleted group lesson`,
    }
  }

  async updateGroupLesson(params: ITeacherGroupLessonEditProps) {
    console.log('params', params)
    const response = await TeacherGroupLessonModel.findOneAndUpdate(
      {
        _id: params._id,
      },
      {
        name: params.name,
        dateLesson: params.dateLesson,
        recruitment_period_date_start: params.recruitment_period_date_start,
        recruitment_period_date_end: params.recruitment_period_date_end,
        timeStart: params.timeStart,
        duration: params.duration,
        price: params.price,
        students_level: params.students_level,
        students_age: params.students_age,
        description: params.description,
        min_count_of_students: params.min_count_of_students,
        max_count_of_students: params.max_count_of_students,
        students: params.students,
        teacher: params.teacher,
      },
      { new: true },
    )

    return {
      message: `You have been updated group lesson`,
      data: response,
    }
  }

  async getGroupLessonsMe(userId: string) {
    const response = await TeacherGroupLessonModel.find({
      teacher: userId,
    })
    return response
  }

  async getGroupLessons() {
    const response = await TeacherGroupLessonModel.find()
    return response
  }

  async getGroupLessonById(id: string) {
    const response = await TeacherGroupLessonModel.find({
      _id: id,
    })
    return response[0]
  }
}

export default new TeacherService()
