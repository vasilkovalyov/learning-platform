const JoiValidation = require('joi')

export const signInValidation = (data: { email: string; password: string }) => {
  const schema = JoiValidation.object({
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
  })

  return schema.validate(data)
}
