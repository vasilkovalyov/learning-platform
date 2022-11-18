import { getWeekNumber } from './getWeekNumber'

export interface ICreateDate {
  date: Date
  dayNumber: number
  day: string
  dayShort: string
  dayNumberInWeek: number
  year: number
  yearShort: string
  month: string
  monthShort: string
  monthNumber: number
  monthIndex: number
  timestamp: number
  week: number
}

export interface ICreateDateProps {
  locale?: string
  date?: Date
}

export const createDate = (params?: ICreateDateProps): ICreateDate => {
  const locale = params?.locale ?? 'en-En'

  const d = params?.date ?? new Date()
  const dayNumber = d.getDate()
  const day = d.toLocaleDateString(locale, { weekday: 'long' })
  const dayShort = d.toLocaleDateString(locale, { weekday: 'short' })
  const dayNumberInWeek = d.getDay() + 1
  const year = d.getFullYear()
  const yearShort = d.toLocaleDateString(locale, { year: '2-digit' })
  const month = d.toLocaleDateString(locale, { month: 'long' })
  const monthShort = d.toLocaleDateString(locale, { month: 'short' })
  const monthNumber = d.getMonth() + 1
  const monthIndex = d.getMonth()
  const timestamp = d.getTime()
  const week = getWeekNumber(d)

  return {
    date: d,
    dayNumber,
    day,
    dayShort,
    dayNumberInWeek,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week,
  }
}
