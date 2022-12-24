import { ICalendarMonth, IMonth, IMonthName } from './CalendarMonth.type'
import CalendarDay from '../CalendarDay/CalendarDay'
import { IDay } from '../CalendarDay/CalendarDay.type'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import { localeDefault } from '../../constants'

class CalendarMonth {
  date: Date
  locale: string

  year: number
  monthIndex: number
  isCurrent: boolean
  monthName: string
  monthShort: string
  monthNumber: number
  events: ICalendarEvent[] | []
  monthDays: IDay[]

  constructor(options?: ICalendarMonth) {
    this.date = options?.date ?? new Date()
    this.locale = options?.locale ?? localeDefault
    this.events = options?.events ?? []

    this.year = this.date.getFullYear() ?? new Date().getFullYear()
    this.monthIndex = this.date.getMonth() ?? new Date().getMonth()
    this.isCurrent = this.isCurrentMonth(this.year, this.monthIndex)
    this.monthName = this.date.toLocaleDateString(this.locale ?? localeDefault, { month: 'long' })
    this.monthShort = this.date.toLocaleDateString(this.locale ?? localeDefault, { month: 'short' })
    this.monthNumber = this.monthIndex + 1
    this.monthDays = this.getMonthDays()
  }

  getMonthDays(): IDay[] {
    const year = this.date ? this.date.getFullYear() : new Date().getFullYear()
    const monthIndex = this.date ? this.date.getMonth() : new Date().getMonth()
    const days: IDay[] = []
    const monthNumberOfDays = new Date(year, monthIndex + 1, 0).getDate()

    for (let i = 0; i < monthNumberOfDays; i++) {
      const events =
        this.events &&
        this.events.filter((event: ICalendarEvent) => {
          const date = new Date(year, monthIndex, i + 1)
          const eventDate = event.duration.from
          if (
            eventDate.getFullYear() === date.getFullYear() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate()
          ) {
            return event
          }
        })
      days[i] = new CalendarDay({
        date: new Date(year, monthIndex, i + 1),
        locale: this.locale,
        events: events,
      }).getDay()
    }

    return days
  }

  createMonth(yearNum?: number, monthNum?: number): IMonth {
    const targetYear = yearNum ?? this.year
    const targetMonth = monthNum ?? this.monthIndex
    const d = new Date(targetYear, targetMonth, 1) ?? this.date
    return {
      monthIndex: targetMonth,
      monthName: d.toLocaleDateString(this.locale || localeDefault, { month: 'long' }),
      monthNumber: targetMonth + 1,
      monthShort: d.toLocaleDateString(this.locale || localeDefault, { month: 'short' }),
      year: targetYear,
      monthDays: this.getMonthDays(),
      isCurrent: this.isCurrentMonth(targetYear, targetMonth),
    }
  }

  getMonthesNames(locale = 'en-En'): IMonthName[] {
    const monthesNames: IMonthName[] = Array.from({ length: 12 })

    monthesNames.forEach((_, i) => {
      const d = new Date()
      const month = new Date(d.getFullYear(), d.getMonth() + i, 1)
      const monthIndex = month.getMonth()

      monthesNames[monthIndex] = {
        date: month,
        month: month.toLocaleDateString(locale, { month: 'long' }),
        monthIndex: month.getMonth(),
        monthShort: month.toLocaleDateString(locale, { month: 'short' }),
      }
    })
    return monthesNames
  }

  getTodayMonth() {
    const d = new Date()
    return this.createMonth(d.getFullYear(), d.getMonth())
  }

  isCurrentMonth(year: number, monthIndex: number): boolean {
    return new Date().getMonth() === monthIndex && year === new Date().getFullYear()
  }
}

export default CalendarMonth
