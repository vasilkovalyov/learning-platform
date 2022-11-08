import { IFormUser, IAuthUserResponse } from "../../interfaces/auth.interface";
import { IUser } from "../../interfaces/user.interface";
import { signUpStudentValidation } from "../../validation/auth.validation"
import ApiError from '../../exeptions/api.exeptions';
import RoleModel from "../../models/role.model"
import bcrypt from 'bcryptjs';
import StudentModel from "../models/student.model"

class StudentService {
  async getUserByEmail(email: string): Promise<IUser | null> {
    return await StudentModel.findOne({ email: email });
  }

  async signUp(params: IFormUser): Promise<IAuthUserResponse<IFormUser>> {
    const { error } = signUpStudentValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message);

    const { login, email, confirm_password, role } = params
    const userRoleExist = await RoleModel.findOne({ email: email });
    // const userPendingExist = await PendingModel.findOne({ email: email }); // temp. don`t remove!!!!

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
    if (userRoleExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`); // temp. should remove later!!!
    // if (userRoleExist && userPendingExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`); // temp. don`t remove!!!!

    const studentModel = new StudentModel({
      login,
      email,
      password: hashedPassword,
      role,
    } as IFormUser);

    // temp. don`t remove!!!!
    // const StudentModel = new PendingModel({
    //     login,
    //     email,
    //     password: hashedPassword,
    //     role,
    // } as IUser);

    const savedUser = await studentModel.save();
    const roleModel = new RoleModel({ id: savedUser._id, role, email })
    await roleModel.save();

    return {
      message: `You have been registered`,
      data: {
        _id: savedUser._id.toString(),
        email: savedUser.email
      }
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await StudentModel.findOne({ _id: id })
  }
}

export default new StudentService()