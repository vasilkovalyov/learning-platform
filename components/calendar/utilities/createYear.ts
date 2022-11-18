import { createMonth, ICreateMonth } from './createMonth'
import { createDate, ICreateDate } from './createDate'

interface ICreateYearProps {
  locale?: string
  year?: number
  monthNumber?: number
}

interface ICreateYear {
  createYearMonthes: () => Array<ICreateDate[]>
  month: ICreateMonth
  year: number
}

export const createYear = (params?: ICreateYearProps): ICreateYear => {
  const locale = params?.locale ?? 'en-En'

  const monthCount = 12
  const today = createDate()

  const year = params?.year ?? today.year
  const monthNumber = params?.monthNumber ?? today.monthNumber

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale })
  const getMonthDays = (monthIndex: number): ICreateDate[] => {
    return createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays()
  }

  const createYearMonthes = (): Array<ICreateDate[]> => {
    const monthes: Array<ICreateDate[]> = []

    for (let i = 0; i <= monthCount - 1; i++) {
      monthes[i] = getMonthDays(i)
    }

    return monthes
  }

  return {
    createYearMonthes,
    month,
    year,
  }
}
