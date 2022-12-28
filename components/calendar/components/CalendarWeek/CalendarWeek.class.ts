import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarDay from '../CalendarDay/CalendarDay.class'
import { ICalendarWeekClassOptions } from './CalendarWeek.type'

import { localeDefault, weekDaysCount } from '../../constants'

class CalendarWeek {
  date: Date
  locale: string
  weekStartNumber: number
  private _year: number
  private _msDayTime: number
  private _currentWeek: number

  constructor(options?: ICalendarWeekClassOptions) {
    this.date = options?.date || new Date()
    this.locale = options?.locale || localeDefault
    this.weekStartNumber = options?.weekStartNumber || 1
    this._year = this.date.getFullYear()
    this._msDayTime = 86400000
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

    for (let i = lastDay.getDay() + this.weekStartNumber; i <= weekDaysCount; i++) {
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

  getWeekDaysByNumber(weekNumber?: number): IDay[] {
    const weekNum = weekNumber ?? this.getCurrentWeekNumberInYear()
    const days: IDay[] = []
    const firstDayYear = new Date(this._year, 0, 1)
    const firstDayNumber = 1 - firstDayYear.getDay() + this.weekStartNumber

    for (let i = 0; i < weekDaysCount; i++) {
      days[i] = new CalendarDay({
        date: new Date(this._year, 0, (weekNum - 1) * 7 + firstDayNumber + i),
      }).getDay()
    }
    return days
  }

  getWeeksTotalCountInYear(): number {
    const firstDayOfYear = new Date(this.date.getFullYear(), 0, 1)
    const pastDaysYear = (this.date.getTime() - firstDayOfYear.getTime()) / this._msDayTime
    return Math.ceil((pastDaysYear + firstDayOfYear.getDay() + this.weekStartNumber) / weekDaysCount)
  }

  getCurrentWeekNumberInYear(): number {
    const fDayYear = new Date(this._year, 0, 1)
    const fDayWeekYear = new Date(this._year, 0, 1 - fDayYear.getDay() + this.weekStartNumber)
    const today = new Date()
    const fDayWeekYearTime = today
    const fDayTodayWeek = new Date(
      this._year,
      today.getMonth(),
      today.getDate() - today.getDay() + this.weekStartNumber,
    )
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), 0, 1)
    const days = Math.floor((currentDate.getTime() - startDate.getTime()) / this._msDayTime)
    return Math.ceil(days / 7)
  }
}

export default CalendarWeek
