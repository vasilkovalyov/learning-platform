import { IFormUser, IAuthUserResponse } from "../../interfaces/auth.interface";
import { IStudent } from "../interfaces/student.interface";
import { signUpStudentValidation } from "../../validation/auth.validation"
import ApiError from '../../exeptions/api.exeptions';
import RoleModel from "../../models/role.model"
import bcrypt from 'bcryptjs';
import { StudentBaseInfoModel } from "../models/student.model"
import StudentDto from "../dto/student.dto";

class StudentService {
  async getUserByEmail(email: string): Promise<IStudent | null> {
    return await StudentBaseInfoModel.findOne({ email: email });
  }

  async signUp(params: IFormUser): Promise<IAuthUserResponse<IFormUser>> {
    const { error } = signUpStudentValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message);

    const { login, email, confirm_password, role, fullname } = params
    const userRoleExist = await RoleModel.findOne({ email: email });
    // const userPendingExist = await PendingModel.findOne({ email: email }); // temp. don`t remove!!!!

    if (userRoleExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`); // temp. should remove later!!!
    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
    // if (userRoleExist && userPendingExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`); // temp. don`t remove!!!!
    const studentBaseInfoModel = new StudentBaseInfoModel({
      login,
      fullname,
      email,
      password: hashedPassword,
      role,
    } as IFormUser);

    // temp. don`t remove!!!!
    // const studentBaseInfoModel = new PendingModel({
    //     login,
    //     email,
    //     password: hashedPassword,
    //     role,
    // } as IStudent);

    const savedUser = await studentBaseInfoModel.save();
    const roleModel = new RoleModel({ _id: savedUser._id, role, email })
    await roleModel.save();

    return {
      message: `You have been registered`,
      data: {
        _id: savedUser._id.toString(),
        email: savedUser.email
      }
    }
  }

  async getUserById(id: string): Promise<IStudent | null> {
    const data: IStudent | null = await StudentBaseInfoModel.findOne({ _id: id })
    if (data === null) return null
    return new StudentDto(data).getAuthDataUser()
  }
}

export default new StudentService()