import Joi from 'joi'
import { IStudentSignUpProps } from '../../models/student/student-account.model'

export const signUpStudentValidation = (data: IStudentSignUpProps) => {
  const schema = Joi.object({
    login: Joi.string().required(),
    fullname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    role: Joi.string().valid('student'),
  })

  return schema.validate(data)
}
