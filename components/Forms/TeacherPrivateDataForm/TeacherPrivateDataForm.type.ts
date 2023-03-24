import { LocationProps } from 'interfaces/common.interface'
import { WorkExperienceProps } from 'components/Forms/WorkExperienceForm/WorkExperienceForm.type'
import { EducationProps } from 'components/Forms/EducationForm/EducationForm.type'

export interface TeacherPrivateFormProps extends Omit<LocationProps, 'address'> {
  about: string
  lessons_prices:
    | {
        count: string
        price: string
      }[]
    | []
  lang_speaking:
    | {
        value: string
      }[]
    | []
  lang_teaching:
    | {
        value: string
      }[]
    | []
  subjects:
    | {
        value: string
      }[]
    | []
  lesson_duration: string
  levels_studying:
    | {
        value: string
      }[]
    | []
  students_ages:
    | {
        value: string
      }[]
    | []
  work_experience: WorkExperienceProps[] | []
  education: EducationProps[] | []
}
