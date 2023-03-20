import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarDay from '../CalendarDay/CalendarDay.class'
import { ICalendarWeekClassOptions } from './CalendarWeek.type'

import { localeDefault, weekDaysCount } from '../../constants'

class CalendarWeek {
  private date: Date
  private locale: string
  private _weekStartNumber: number

  constructor(options?: ICalendarWeekClassOptions) {
    this.date = options?.date || new Date()
    this.locale = options?.locale || localeDefault
    this._weekStartNumber = options?.weekStartNumber ?? 1
  }

  static getWeekDayByDate(date: Date): IDay[] {
    const firstDay = date.getDate() - date.getDay() + 1
    return Array.from(Array(weekDaysCount).keys()).map((num) => {
      return new CalendarDay({ date: new Date(date.getFullYear(), date.getMonth(), firstDay + num) }).getDay()
    })
  }

  getWeekNames(type: 'long' | 'short' = 'long'): string[] {
    const weekDays: string[] = []

    for (let i = 0; i < weekDaysCount; i++) {
      const d = new Date()
      const date = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + i)
      weekDays.push(date.toLocaleDateString(this.locale, { weekday: type }))
    }

    return [...weekDays.slice(this._weekStartNumber), ...weekDays.slice(0, this._weekStartNumber)]
  }

  getPrevDaysInFirstWeek(date?: Date): IDay[] {
    const firstDay = date ?? new Date(this.date.getFullYear(), 0, 1)
    const monthIndex = !date ? 0 : date.getMonth()
    const prevDays: IDay[] = []
    for (let i = firstDay.getDay() || 7; i > 1; i--) {
      prevDays.push(
        new CalendarDay({
          date: new Date(firstDay.getFullYear(), monthIndex, 2 - i),
          isCurrentMonth: false,
          locale: this.locale,
        }).getDay(),
      )
    }

    return prevDays
  }

  getPastDaysInLastWeek(date?: Date): IDay[] {
    const lastDay = date ?? new Date(this.date.getFullYear(), 12, 0)
    const monthIndex = !date ? 11 : date.getMonth()

    const pastDays: IDay[] = []

    for (let i = lastDay.getDay() + this._weekStartNumber; i <= weekDaysCount; i++) {
      pastDays.push(
        new CalendarDay({
          date: new Date(lastDay.getFullYear(), monthIndex, lastDay.getDate() + (i - lastDay.getDay())),
          isCurrentMonth: false,
          locale: this.locale,
        }).getDay(),
      )
    }

    return pastDays
  }
}

export default CalendarWeek
