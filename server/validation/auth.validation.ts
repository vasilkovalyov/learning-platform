import Joi from 'joi'

export const signInValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}
