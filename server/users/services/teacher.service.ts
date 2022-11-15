import { IFormTeacher, IAuthUserResponse } from "../../interfaces/auth.interface";
import { ITeacherPrivateData, ITeacherUser } from "../interfaces/teacher.interface";
import { signUpTeacherValidation } from "../../validation/auth.validation"
import ApiError from '../../exeptions/api.exeptions';
import RoleModel from "../../models/role.model"
import bcrypt from 'bcryptjs';
import { TeacherBaseInfoModel, TeacherPrivateDataModel, TeacherServicesModel, TeacherLessonsModel } from "../models/teacher.model"
import TeacherDto from "../dto/teacher.dto";

class TeacherService {
  async getUserByEmail(email: string): Promise<ITeacherUser | null> {
    return await TeacherBaseInfoModel.findOne({ email: email });
  }

  async signUp(params: IFormTeacher): Promise<IAuthUserResponse<IFormTeacher>> {
    const { error } = signUpTeacherValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message);

    const { fullname, login, email, confirm_password, role, address, city, state, country, education, phone, work_experience } = params
    const userExist = await RoleModel.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
    if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`);

    console.log('params', params)
    const teacherBaseInfoModel = new TeacherBaseInfoModel({
      fullname,
      login,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    const savedUser = await teacherBaseInfoModel.save();

    const teacherPrivateDataModel = new TeacherPrivateDataModel({
      teacher: savedUser._id,
      address,
      city,
      state,
      country,
      education,
      work_experience
    })
    await teacherPrivateDataModel.save()

    const teacherServicesModel = new TeacherServicesModel({ teacher: savedUser._id })
    const teacherLessonsModel = new TeacherLessonsModel({ teacher: savedUser._id })

    await teacherLessonsModel.save()
    await teacherServicesModel.save()
  
    const roleModel = new RoleModel({ _id: savedUser._id, role, email })
    await roleModel.save();

    return {
      message: `You have been registered`,
      data: null
    }
  }

  async getUserById(id: string): Promise<ITeacherUser | null> {
    const data: ITeacherUser | null = await TeacherBaseInfoModel.findOne({ _id: id })
    if (data === null) return null
    return new TeacherDto(data).getAuthDataUser()
  }

  async getUserPrivateData(id: string): Promise<ITeacherPrivateData> {
    const privateData = await TeacherPrivateDataModel.findOne( { teacher: id })
    const lessonsData = await TeacherLessonsModel.findOne( { teacher: id })
    const servicesData = await TeacherServicesModel.findOne( { teacher: id })
    
    return {
      _id: id,
      lessons: lessonsData,
      private_data: privateData,
      services: servicesData
    }
  }
}

export default new TeacherService()