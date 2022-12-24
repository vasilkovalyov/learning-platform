import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarDay from '../CalendarDay/CalendarDay'
import { ICalendarWeekOptions } from './CalendarWeek.type'

import { localeDefault, weekDaysCount } from '../../constants'

class CalendarWeek {
  date: Date
  locale: string
  weekStartNumber: number

  constructor(options?: ICalendarWeekOptions) {
    this.date = options?.date || new Date()
    this.locale = options?.locale || localeDefault
    this.weekStartNumber = options?.weekStartNumber || 1
  }

  getWeeksInYear(): number {
    const firstDayOfYear = new Date(this.date.getFullYear(), 0, 1)
    const pastDaysYear = (this.date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysYear + firstDayOfYear.getDay() + 1) / weekDaysCount)
  }

  getWeekNames(type: 'long' | 'short' = 'long'): string[] {
    const weekDays: string[] = []

    for (let i = 0; i < weekDaysCount; i++) {
      const d = new Date()
      const date = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + i)
      weekDays.push(date.toLocaleDateString(this.locale, { weekday: type }))
    }

    return [...weekDays.slice(this.weekStartNumber), ...weekDays.slice(0, this.weekStartNumber)]
  }

  getPrevDaysInFirstWeek(): IDay[] {
    const firstDay = new Date(this.date.getFullYear(), 0, 1)
    const prevDays: IDay[] = []

    for (let i = firstDay.getDay(); i > 1; i--) {
      const d = new Date(this.date.getFullYear(), 0, 2 - i)
      prevDays.push(
        new CalendarDay({
          locale: this.locale,
        }).getDay(d.getFullYear(), d.getMonth(), d.getDate()),
      )
    }

    return prevDays
  }

  getPastDaysInLastWeek(): IDay[] {
    const lastDay = new Date(this.date.getFullYear(), 12, 0)
    const pastDays: IDay[] = []

    for (let i = lastDay.getDay() + 1; i <= weekDaysCount; i++) {
      const d = new Date(this.date.getFullYear(), 11, lastDay.getDate() + (i - lastDay.getDay()))
      pastDays.push(
        new CalendarDay({
          locale: this.locale,
        }).getDay(d.getFullYear(), d.getMonth(), d.getDate()),
      )
    }

    return pastDays
  }
}

export default CalendarWeek
