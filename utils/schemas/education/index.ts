import * as yup from 'yup'

export const EducationFormSchema = yup.object().shape({
  university_name: yup.string().required('University name is required'),
  faculty: yup.string().required('Faculty is required'),
  specialization: yup.string().required('Specialization is required'),
  date_month_start: yup.string().required('Start month education is required'),
  date_year_start: yup.number().required('Start year education is required'),
  date_month_end: yup.string().required('Start month education is required'),
  date_year_end: yup.number().test('is-greater', 'Next year should be greater than previous year', function (value) {
    const previousYear = this.parent.date_year_start
    if (previousYear && value && value <= previousYear) {
      return false
    }
    return true
  }),
})
