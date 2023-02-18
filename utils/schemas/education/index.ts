import * as yup from 'yup'

export const EducationFormSchema = yup.object().shape({
  university_name: yup.string().required('University name is required'),
  faculty: yup.string().required('Faculty is required'),
  specialization: yup.string().required('Specialization is required'),
  start_month_education: yup.string().required('Start month education is required'),
  start_year_education: yup.string().required('Start year education is required'),
  end_month_education: yup.string().required('End month education is required'),
  end_year_education: yup.string().required('End year education is required'),
})
