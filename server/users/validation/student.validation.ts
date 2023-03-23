const JoiValidation = require('joi')
import { IStudentSignUp } from '../interfaces/student.interface'

export const signUpStudentValidation = (data: IStudentSignUp) => {
  const schema = JoiValidation.object({
    login: JoiValidation.string().required(),
    fullname: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
    confirm_password: JoiValidation.string().required().valid(JoiValidation.ref('password')),
    role: JoiValidation.string().valid('student'),
  })

  return schema.validate(data)
}
