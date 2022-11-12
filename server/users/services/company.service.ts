import { IFormCompany, IAuthUserResponse } from "../../interfaces/auth.interface";
import { ICompanyUser } from "../interfaces/company.interface";
import { signUpCompanyValidation } from "../../validation/auth.validation"
import ApiError from '../../exeptions/api.exeptions';
import RoleModel from "../../models/role.model"
import bcrypt from 'bcryptjs';
import CompanyModel from "../models/company.model"

class CompanyService {
  async getUserByEmail(email: string): Promise<ICompanyUser | null> {
    return await CompanyModel.findOne({ email: email });
  }

  async signUp(params: IFormCompany): Promise<IAuthUserResponse<IFormCompany>> {
    const { error } = signUpCompanyValidation(params)
    if (error) throw ApiError.BadRequest(error.details[0].message);

    const { login, email, confirm_password, role, city, state, country, phone, company_name, inn_code, mailing_address, legal_address } = params
    const userExist = await RoleModel.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(confirm_password, bcrypt.genSaltSync(10));
    if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist!`);

    const companyModel = new CompanyModel({
      login,
      email,
      password: hashedPassword,
      role,
      city,
      state,
      country,
      phone,
      company_name,
      inn_code,
      mailing_address,
      legal_address,
    });

    const savedUser = await companyModel.save();
    const roleModel = new RoleModel({ _id: savedUser._id, role, email })
    await roleModel.save();

    return {
      message: `You have been registered`,
      data: null
    }
  }

  async getUserById(id: string): Promise<ICompanyUser | null> {
    return await CompanyModel.findOne({ _id: id })
  }
}

export default new CompanyService()