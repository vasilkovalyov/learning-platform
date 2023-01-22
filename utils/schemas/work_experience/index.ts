import * as yup from 'yup'

export const WorkExperienceFormSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required'),
  position: yup.string().required('Position is required'),
  place_destination: yup.string().required('Place destination is required'),
  start_month_working: yup.string().required('Start month working is required'),
  start_year_working: yup.string().required('Start year working is required'),
  end_month_working: yup.string().required('End month working is required'),
  end_year_working: yup.string().required('End year working is required'),
})
