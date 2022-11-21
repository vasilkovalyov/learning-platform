import CalendarDate, { ICreateDate } from './CalendarDate'
import CalendarMonth, { ICreateMonth } from './CalendarMonth'

export interface ICreateYearProps {
  locale?: string
  year?: number
  monthNumber?: number
}

export interface ICreateYear {
  createYearMonthes: () => Array<ICreateDate[]>
  month: ICreateMonth
  year: number
}

class CalendarYear {
  createYear(params?: ICreateYearProps) {
    const locale = params?.locale ?? 'en-En'

    const calendarDateInst = new CalendarDate()
    const calendarMonthInst = new CalendarMonth()

    const monthCount = 12
    const today = calendarDateInst.createDate()

    const year = params?.year ?? today.year
    const monthNumber = params?.monthNumber ?? today.monthNumber

    const month = calendarMonthInst.createMonth({ date: new Date(year, monthNumber - 1), locale })

    const createYearMonthes = (): Array<ICreateDate[]> => {
      const monthes: Array<ICreateDate[]> = []

      for (let i = 0; i <= monthCount - 1; i++) {
        monthes[i] = calendarMonthInst.getMonthDays(year, i, locale)
      }

      return monthes
    }

    return {
      createYearMonthes,
      month,
      year,
    }
  }
}

export default CalendarYear
