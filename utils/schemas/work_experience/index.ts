import * as yup from 'yup'

export const WorkExperienceFormSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required'),
  position: yup.string().required('Position is required'),
  place_destination: yup.string().required('Place destination is required'),
  dateStart: yup.object().shape({
    month: yup.string().required('Start month working is required'),
    year: yup.string().required('Start year working is required'),
  }),
  dateEnd: yup.object().shape({
    month: yup.string().required('End month working is required'),
    year: yup.string().required('End year working is required'),
  }),
})
