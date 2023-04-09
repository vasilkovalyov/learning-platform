import * as yup from 'yup'

export const GroupLessonFormSchema = yup.object().shape({
  name: yup.string().required('Lesson name is required'),
  dateLesson: yup.date().required('Lesson date is required '),
  description: yup.string().required('Description is required '),
  duration: yup.string().required('Duration is required '),
  min_count_of_students: yup.string().required('Min count of student is required '),
  max_count_of_students: yup.string().required('Max count of student is required '),
  price: yup.string().required('Price is required '),
  recruitment_period_date_start: yup.date().required('recruitment period date start is required '),
  recruitment_period_date_end: yup.date().required('recruitment period date end is required '),
  students_level: yup.string().required('Students level is required '),
  students_age: yup.string().required('Students age is required '),
  timeStart: yup.string().required('Time start is required '),
})
