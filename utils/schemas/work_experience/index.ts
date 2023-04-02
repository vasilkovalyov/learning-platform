import * as yup from 'yup'

export const WorkExperienceFormSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required'),
  position: yup.string().required('Position is required'),
  place_destination: yup.string().required('Place destination is required'),
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
