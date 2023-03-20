import { ICalendarClassMonthOptions, IMonthName } from './CalendarMonth.type'
import CalendarDay from '../CalendarDay/CalendarDay.class'
import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarWeek from '../CalendarWeek/CalendarWeek.class'

import { localeDefault, weekDaysCount } from '../../constants'

class CalendarMonth {
  date: Date
  locale: string

  private _year: number
  private _monthIndex: number
  private _isCurrent: boolean
  private _monthName: string
  private _monthShort: string
  private _monthNumber: number

  constructor(options?: ICalendarClassMonthOptions) {
    this.date = options?.date ?? new Date()
    this.locale = options?.locale ?? localeDefault

    this._year = this.date.getFullYear() ?? this.date.getFullYear()
    this._monthIndex = this.date.getMonth() ?? this.date.getMonth()
    this._isCurrent = CalendarMonth.isCurrentMonth(this.date, this._year, this._monthIndex)
    this._monthName = this.date.toLocaleDateString(this.locale ?? localeDefault, { month: 'long' })
    this._monthShort = this.date.toLocaleDateString(this.locale ?? localeDefault, { month: 'short' })
    this._monthNumber = this._monthIndex + 1
  }

  get monthName(): string {
    return this._monthName
  }

  static getMonthesNames(locale = localeDefault): IMonthName[] {
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

  getMonthDaysFullView(): IDay[] {
    const monthIndex = this.date ? this.date.getMonth() : new Date().getMonth()
    const prevDays = new CalendarWeek().getPrevDaysInFirstWeek(new Date(this.date.getFullYear(), monthIndex, 1))
    const pastDays = new CalendarWeek().getPastDaysInLastWeek(new Date(this.date.getFullYear(), monthIndex + 1, 0))
    const updatePrevDays = prevDays.length === weekDaysCount ? [] : prevDays
    const updatePastDays = pastDays.length === weekDaysCount ? [] : pastDays
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

  getMonthIndex(): number {
    return this._monthNumber
  }

  static getDaysCountInMonthByIndex(year: number, monthNumber: number): number {
    return new Date(year, monthNumber, 0).getDate()
  }
}

export default CalendarMonth
