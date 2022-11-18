import { createDate, ICreateDate } from './createDate'
import { getMonthNumberOfDays } from './getMonthNumberOfDays'

export interface ICreateMonthProps {
  locale?: string
  date?: Date
}

export interface ICreateMonth {
  monthIndex: number
  monthName: string
  monthNumber: number
  monthShort: string
  year: number
  getDay: (dayNumber: number) => ICreateDate
  createMonthDays: () => ICreateDate[]
}

export const createMonth = (params?: ICreateMonthProps): ICreateMonth => {
  const date = params?.date ?? new Date()
  const locale = params?.locale ?? 'en-En'

  const d = createDate({ locale, date })
  const { month: monthName, year, monthNumber, monthIndex, monthShort } = d

  const getDay = (dayNumber: number): ICreateDate => {
    return createDate({ date: new Date(year, monthIndex, dayNumber), locale })
  }

  const createMonthDays = () => {
    const days: ICreateDate[] = []

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i++) {
      days[i] = getDay(i + 1)
    }

    return days
  }

  return {
    monthIndex,
    monthName,
    monthNumber,
    monthShort,
    year,
    getDay,
    createMonthDays,
  }
}
