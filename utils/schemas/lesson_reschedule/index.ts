import * as yup from 'yup'

export const LessonRescheduleFormSchema = yup.object().shape({
  day: yup.string().required('Day name is required'),
  month: yup.string().required('Month is required'),
  year: yup.string().required('Year is required'),
  timeStart: yup.string().required('Time start is required'),
  duration: yup.string().required('Duration is required'),
})
