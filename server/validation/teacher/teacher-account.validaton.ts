import Joi from 'joi'

export const signUpTeacherValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    login: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    education: Joi.array().items(Joi.string()),
    work_experience: Joi.array().items(Joi.string()),
    role: Joi.string().valid('teacher'),
  })

  return schema.validate(data)
}
