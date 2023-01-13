import * as yup from 'yup'

export const RegistrationStudentFormSchema = yup.object().shape({
  login: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  email: yup.string().email('Wrong email').required('Email is required'),
  password: yup.string().min(6, 'Length of password should be more then 6 letters').required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required'),
})
