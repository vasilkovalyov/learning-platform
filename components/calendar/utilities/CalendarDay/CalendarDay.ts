import { ICalendarDayOptions, IDay } from './CalendarDay.type'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

const localeDefault = 'en-En'

class CalendarDay {
  date: Date
  locale: string
  private _events: ICalendarEvent[] | []
  private _weekendDays: string[]
  private _isCurrentMonth: boolean

  constructor(options?: ICalendarDayOptions) {
    this.date = options?.date ?? new Date()
    this.locale = options?.locale ?? localeDefault
    this._events = options?.events || []
    this._weekendDays = options?.weekendDays || ['Saturday', 'Sunday']
    this._isCurrentMonth = options?.isCurrentMonth ?? false
  }

  get events() {
    return this._events
  }

  getDay(): IDay {
    const dayNumber = this.date.getDate()
    const day = this.date.toLocaleDateString(this.locale, { weekday: 'long' })
    const dayShort = this.date.toLocaleDateString(this.locale, { weekday: 'short' })
    const dayNumberInWeek = this.date.getDay() || 1
    const year = this.date.getFullYear()
    const yearShort = this.date.toLocaleDateString(this.locale, { year: '2-digit' })
    const month = this.date.toLocaleDateString(this.locale, { month: 'long' })
    const monthShort = this.date.toLocaleDateString(this.locale, { month: 'short' })
    const monthNumber = this.date.getMonth() + 1
    const monthIndex = this.date.getMonth()
    const timestamp = this.date.getTime()

    return {
      date: this.date,
      dayNumber,
      day,
      dayShort,
      dayNumberInWeek,
      year,
      yearShort,
      month,
      monthShort,
      monthNumber,
      monthIndex,
      timestamp,
      isCurrentMonth: this._isCurrentMonth,
      events: this.events,
      isToday: this.isToday(this.date),
      isWeekend: this._weekendDays && this._weekendDays.find((weekend) => weekend === day) ? true : false,
    }
  }

  isToday(date: Date): boolean {
    const today = new Date()
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
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
}

export default CalendarDay
