import { UserLocationProps } from 'interfaces/user.interface'
import { WorkExperienceProps } from 'components/Forms/WorkExperienceForm/WorkExperienceForm.type'
import { EducationProps } from 'components/Forms/EducationForm/EducationForm.type'

export interface TeacherPrivateDataFormProps {
  initialData: TeacherPrivateFormProps
}

export interface TeacherPrivateFormProps extends Omit<UserLocationProps, 'address'> {
  about: string
  lesson_1: string
  lesson_5: string
  lesson_10: string
  lesson_20: string
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
