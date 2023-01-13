import * as yup from 'yup'

export const RegistrationTeacherFormFirstSchema = yup.object().shape({
  login: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('Wrong email').required('Email is required'),
  password: yup.string().min(6, 'Length of password should be more then 6 letters').required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required'),
  phone: yup.string().required('Phone is required'),
})

export const RegistrationTeacherFormSecondSchema = yup.object().shape({
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
})

export const RegistrationTeacherFormThirdSchema = yup.object().shape({
  education: yup.array().of(
    yup.object().shape({
      value: yup.string().required('Education is required'),
    }),
  ),
  work_experience: yup.array().of(
    yup.object().shape({
      value: yup.string().required('Education is required'),
    }),
  ),
})
