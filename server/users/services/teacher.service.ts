import { IFormTeacher, IAuthUserResponse } from "../../interfaces/auth.interface";
import { ITeacherUser } from "../../interfaces/user.interface";
import { signUpTeacherValidation } from "../../validation/auth.validation"
import ApiError from '../../exeptions/api.exeptions';
import RoleModel from "../../models/role.model"
import bcrypt from 'bcryptjs';
import TeacherModel from "../models/teacher.model"

class TeacherService {
  async getUserByEmail(email: string): Promise<ITeacherUser | null> {
    return await TeacherModel.findOne({ email: email });
  }

  async signUp(params: IFormTeacher): Promise<IAuthUserResponse<IFormTeacher>> {
    const { error } = signUpTeacherValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message);

    const { login, email, confirm_password, role, address, city, state, country, education, phone, work_experience } = params
    const userExist = await RoleModel.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
    if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`);

    const teacherModel = new TeacherModel({
      login,
      email,
      password: hashedPassword,
      role,
      address,
      city,
      state,
      country,
      education,
      phone,
      work_experience,
    });

    const savedUser = await teacherModel.save();
    const roleModel = new RoleModel({ id: savedUser._id, role, email })
    await roleModel.save();

    return {
      message: `You have been registered`,
      data: null
    }
  }

  async getUserById(id: string): Promise<ITeacherUser | null> {
    return await TeacherModel.findOne({ _id: id })
  }
}

export default new TeacherService()