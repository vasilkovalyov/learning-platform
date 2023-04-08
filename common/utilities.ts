// import notification, { NotificationPlacement } from 'antd/lib/notification'

import { ITeacherWorkExperience } from '../interfaces/teacher.interface'

export interface INotification {
  message: string
  description?: string
  duration: number
}
const defaultProps: INotification = {
  message: `Data of user has been saved successful`,
  duration: 3,
}

// export const openNotification = (placement: NotificationPlacement, props: INotification = defaultProps) => {
//   notification.info({
//     message: props.message,
//     description: props.description,
//     duration: props.duration,
//     placement,
//   })
// }

export function showButtonAddField<T>(fields: T[], index: number) {
  return fields.length === 1 || index === fields.length - 1
}

export function showButtonRemoveField<T>(fields: T[]) {
  return fields.length > 1
}

export function getMonthsNames(locale = 'en-En'): { monthName: string; monthNumber: number }[] {
  const monthesNames:
    | {
        monthName: string
        monthNumber: number
      }[]
    | [] = []

  Array.from({ length: 12 }).forEach((_, i) => {
    const d = new Date()
    const month = new Date(d.getFullYear(), i - 1, 1)
    const monthIndex = month.getMonth()

    monthesNames[monthIndex] = {
      monthName: month.toLocaleDateString(locale, { month: 'long' }),
      monthNumber: i + 1,
    }
  })

  return monthesNames
}

export function getDaysByDate(
  year: number = new Date().getFullYear(),
  monthNumber: number = new Date().getMonth(),
): number[] {
  const countDaysInMonth = new Date(year, monthNumber + 1, 0)
  return Array.from(Array(countDaysInMonth.getDate()).keys()).map((item) => item + 1)
}

export function getExperienceYearBasedOnWork(work_experience: ITeacherWorkExperience[]): number {
  const startYear = work_experience[0].date_year_start
  const endYear = work_experience[work_experience.length - 1].date_year_start
  if (startYear && endYear) return endYear - startYear
  return 0
}

export function getCurrentTime(): string {
  const today = new Date()
  const hours = today.getHours()
  const timeCode = hours > 12 ? 'pm' : 'am'
  const time = `${today.getHours()}:${today.getMinutes()} ${timeCode}`
  return time
}
