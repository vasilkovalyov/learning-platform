const JoiValidation = require('joi');
import { IUserSignIn, IUserSignUp, ICompanyUser, ITeacherUser } from "../interfaces/user.interface";

export const signInValidation = (data: IUserSignIn) => {
  const schema = JoiValidation.object({
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
  })

  return schema.validate(data)
}

export const signUpStudentValidation = (data: IUserSignUp) => {
  const schema = JoiValidation.object({
    login: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
    confirm_password: JoiValidation.string().required().valid(JoiValidation.ref('password')),
    role: JoiValidation.string().valid('student')
  })

  return schema.validate(data)
}

export const signUpTeacherValidation = (data: IUserSignUp & ITeacherUser) => {
  const schema = JoiValidation.object({
    address: JoiValidation.string().required(),
    city: JoiValidation.string().required(),
    country: JoiValidation.string().required(),
    diploma: JoiValidation.object(),
    phone: JoiValidation.string().required(),
    passport: JoiValidation.string().required(),
    education: JoiValidation.array().items(JoiValidation.string()),
    work_experience: JoiValidation.array().items(JoiValidation.string()),
    role: JoiValidation.string().valid('teacher'),
  })

  return signUpStudentValidation(data) && schema.validate(data)
}

export const signUpCompanyValidation = (data: IUserSignUp & ICompanyUser) => {
  const schema = JoiValidation.object({
    phone: JoiValidation.string().required(),
    company_name: JoiValidation.string().required(),
    inn_code: JoiValidation.string().required(),
    country: JoiValidation.string().required(),
    city: JoiValidation.string().required(),
    legal_address: JoiValidation.string().required(),
    mailing_address: JoiValidation.string().required(),
    role: JoiValidation.string().valid('company')
  })

  return signUpStudentValidation(data) && schema.validate(data)
}

