const JoiValidation = require('joi')

export const signUpTeacherValidation = (data) => {
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
