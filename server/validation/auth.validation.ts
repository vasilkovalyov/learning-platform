const JoiValidation = require('joi');
import { IFormUser, IFormTeacher, IFormCompany } from "../interfaces/auth.interface";

export const signInValidation = (data: Pick<IFormUser, 'email' | 'password'>) => {
  const schema = JoiValidation.object({
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
  })

  return schema.validate(data)
}

export const signUpStudentValidation = (data: IFormUser) => {
  const schema = JoiValidation.object({
    login: JoiValidation.string().required(),
    fullname: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
    confirm_password: JoiValidation.string().required().valid(JoiValidation.ref('password')),
    role: JoiValidation.string().valid('student')
  })

  return schema.validate(data)
}

export const signUpTeacherValidation = (data: IFormTeacher) => {
  const schema = JoiValidation.object({
    fullname: JoiValidation.string().required(),
    login: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
    confirm_password: JoiValidation.string().required().valid(JoiValidation.ref('password')),
    address: JoiValidation.string().required(),
    city: JoiValidation.string().required(),
    state: JoiValidation.string().required(),
    country: JoiValidation.string().required(),
    phone: JoiValidation.string().required(),
    education: JoiValidation.array().items(JoiValidation.string()),
    work_experience: JoiValidation.array().items(JoiValidation.string()),
    role: JoiValidation.string().valid('teacher'),
  })

  return schema.validate(data)
}

export const signUpCompanyValidation = (data: IFormCompany) => {
  const schema = JoiValidation.object({
    login: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
    confirm_password: JoiValidation.string().required().valid(JoiValidation.ref('password')),
    phone: JoiValidation.string().required(),
    company_name: JoiValidation.string().required(),
    inn_code: JoiValidation.string().required(),
    city: JoiValidation.string().required(),
    state: JoiValidation.string().required(),
    country: JoiValidation.string().required(),
    legal_address: JoiValidation.string().required(),
    mailing_address: JoiValidation.string().required(),
    role: JoiValidation.string().valid('company'),
  })

  return schema.validate(data)
}

