const JoiValidation = require('joi');

export const signInValidation = (data) => {
  const schema = JoiValidation.object({
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
  })

  return schema.validate(data)
}

export const signUpStudentValidation = (data) => {
  const schema = JoiValidation.object({
    login: JoiValidation.string().required(),
    email: JoiValidation.string().required().email(),
    password: JoiValidation.string().min(6).required(),
    confirm_password: JoiValidation.any().equal(JoiValidation.ref('password')).required(),
    role: JoiValidation.string().valid('student')
  })

  return schema.validate(data)
}

export const signUpTeacherValidation = (data) => {
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

export const signUpCompanyValidation = (data) => {
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

// module.exports.signUpStudentValidation = signInValidation
// module.exports.signUpStudentValidation = signUpStudentValidation
// module.exports.signUpTeacherValidation = signUpTeacherValidation
// module.exports.signUpCompanyValidation = signUpCompanyValidation
