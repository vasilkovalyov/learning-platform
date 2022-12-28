import { ICalendarClassMonthOptions, IMonth, IMonthName } from './CalendarMonth.type'
import CalendarDay from '../CalendarDay/CalendarDay.class'
import { IDay } from '../CalendarDay/CalendarDay.type'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'
import CalendarWeek from '../CalendarWeek/CalendarWeek.class'

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

  constructor(options?: ICalendarClassMonthOptions) {
    this.date = options?.date ?? new Date()
    this.locale = options?.locale ?? localeDefault

    this.year = this.date.getFullYear() ?? this.date.getFullYear()
    this.monthIndex = this.date.getMonth() ?? this.date.getMonth()
    this.isCurrent = CalendarMonth.isCurrentMonth(this.date, this.year, this.monthIndex)
    this.monthName = this.date.toLocaleDateString(this.locale ?? localeDefault, { month: 'long' })
    this.monthShort = this.date.toLocaleDateString(this.locale ?? localeDefault, { month: 'short' })
    this.monthNumber = this.monthIndex + 1
  }

  getMonthDaysFullView(): IDay[] {
    const monthIndex = this.date ? this.date.getMonth() : new Date().getMonth()
    const prevDays = new CalendarWeek().getPrevDaysInFirstWeek(new Date(this.date.getFullYear(), monthIndex, 1))
    const pastDays = new CalendarWeek().getPastDaysInLastWeek(new Date(this.date.getFullYear(), monthIndex + 1, 0))
    const updatePrevDays = prevDays.length === 7 ? [] : prevDays
    const updatePastDays = pastDays.length === 7 ? [] : pastDays
    return [...updatePrevDays, ...this.getMonthDays(), ...updatePastDays]
  }

  getMonthDays(): IDay[] {
    const year = this.date ? this.date.getFullYear() : new Date().getFullYear()
    const monthIndex = this.date ? this.date.getMonth() : new Date().getMonth()
    const days: IDay[] = []
    const monthNumberOfDays = new Date(year, monthIndex + 1, 0).getDate()

    for (let i = 0; i < monthNumberOfDays; i++) {
      days[i] = new CalendarDay({
        date: new Date(year, monthIndex, i + 1),
        locale: this.locale,
        isCurrentMonth: true,
      }).getDay()
    }

    return days
  }

  // createMonth(yearNum?: number, monthNum?: number): IMonth {
  //   const targetYear = yearNum ?? this.year
  //   const targetMonth = monthNum ?? this.monthIndex
  //   const d = new Date(targetYear, targetMonth, 1) ?? this.date
  //   return {
  //     monthIndex: targetMonth,
  //     monthName: d.toLocaleDateString(this.locale || localeDefault, { month: 'long' }),
  //     monthNumber: targetMonth + 1,
  //     monthShort: d.toLocaleDateString(this.locale || localeDefault, { month: 'short' }),
  //     year: targetYear,
  //     monthDays: this.getMonthDays(),
  //     monthDaysFullView: this.getMonthDaysFullView(),
  //     isCurrent: CalendarMonth.isCurrentMonth(d, targetYear, targetMonth),
  //   }
  // }

  // getTodayMonth() {
  //   return this.createMonth(this.date.getFullYear(), this.date.getMonth())
  // }

  static getMonthesNames(locale = 'en-En'): IMonthName[] {
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

  static isCurrentMonth(date: Date, year: number, monthIndex: number): boolean {
    return date.getMonth() === monthIndex && year === date.getFullYear()
  }

  static getMonthNameByIndex(index: number): IMonthName {
    let targetMonth!: IMonthName
    const monthes = CalendarMonth.getMonthesNames()
    for (let i = 0; i <= monthes.length - 1; i++) {
      if (monthes[i].monthIndex === index) {
        targetMonth = monthes[i]
        break
      }
    }
    return targetMonth
  }
}

export default CalendarMonth
