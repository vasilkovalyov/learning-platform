import CalendarMonth from './CalendarMonth'
import CalendarDate, { ICreateDate } from './CalendarDate'

export interface IDayProps {
  dayNumber: number
  year: number
  monthIndex: number
  locale?: string
}

class CalendarDay {
  getDay(params: IDayProps): ICreateDate {
    const locale = params?.locale ?? 'en-En'
    return new CalendarDate().createDate({ date: new Date(params.year, params.monthIndex, params.dayNumber), locale })
  }

  checkDateIsEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  getDayHours(start = 0, end = 24, gap = 1): string[] {
    const hoursArray: string[] = []
    for (let i = start; i <= end; i++) {
      for (let j = 0; j < gap; j++) {
        hoursArray.push(`${i < 10 ? `0${i}` : i}:${j === 0 ? `00` : 15 * j}`)
      }
    }
    return hoursArray
  }

  checkIsToday(date: Date) {
    const today = new Date()

    return this.checkDateIsEqual(today, date)
  }
}

export default CalendarDay
