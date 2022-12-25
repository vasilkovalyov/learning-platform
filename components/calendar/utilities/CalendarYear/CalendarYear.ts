import { ICalendarYearOptions, ICalendarYear } from './CalendarYear.type'
import CalendarMonth from '../CalendarMonth/CalendarMonth'
import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarWeek from '../CalendarWeek/CalendarWeek'
import { ICalendarWeek } from '../CalendarWeek/CalendarWeek.type'
import { IMonth } from '../CalendarMonth/CalendarMonth.type'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import { localeDefault, weekDaysCount } from '../../constants'

class CalendarYear {
  private _year: number
  locale: string
  private _events: ICalendarEvent[]
  private _weeksTotalCount: number

  constructor(options: ICalendarYearOptions) {
    this._year = options.year ?? new Date().getFullYear()
    this._events = options.events || []
    this.locale = options?.locale ?? localeDefault
    this._weeksTotalCount = new CalendarWeek({ date: new Date(this._year, 0, 0) }).getWeeksTotalCountInYear()
  }

  get events(): ICalendarEvent[] {
    return this._events
  }

  set events(events: ICalendarEvent[]) {
    this._events = events
  }

  get year(): number {
    return this._year
  }

  set year(year: number) {
    this._year = year
  }

  getWeeksTotalCount() {
    return this._weeksTotalCount
  }

  getYearMonthes(): CalendarMonth[] {
    const monthes: CalendarMonth[] = []
    for (let i = 0; i < 12; i++) {
      const events =
        this.events &&
        this.events.filter((event) => {
          const date = new Date(this._year, i)
          const eventDate = event.duration.from
          if (eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth()) {
            return event
          }
        })
      monthes[i] = new CalendarMonth({
        date: new Date(this._year, i, 1),
        events: events,
        locale: this.locale,
      })
    }
    return monthes
  }

  getYearDays(): IDay[] {
    let days: IDay[] = []

    for (let i = 0; i < 12; i++) {
      const month = new CalendarMonth({ locale: this.locale, date: new Date(this.year, i, 1) }).createMonth()
      days = [...days, ...month.monthDays]
    }
    return days
  }

  getTotalWeeksDaysInYear(): IDay[] {
    const weekInst = new CalendarWeek({ locale: this.locale, date: new Date(this._year, 0, 1) })
    const totalDays = [
      ...weekInst.getPrevDaysInFirstWeek(new Date(this._year, 0, 1)),
      ...this.getYearDays(),
      ...weekInst.getPastDaysInLastWeek(new Date(this._year, 12, 0)),
    ]
    return totalDays
  }

  getYearWeeks(): ICalendarWeek[] {
    const totalDays = this.getTotalWeeksDaysInYear()

    const weeks: ICalendarWeek[] = []
    const weeksCount = totalDays.length / weekDaysCount

    let counter = 0
    for (let i = 0; i < weeksCount; i++) {
      const getDays = totalDays.splice(i - counter, weekDaysCount)
      const isToday = getDays.find(
        (day) =>
          day.dayNumber === new Date().getDate() &&
          day.monthIndex === new Date().getMonth() &&
          day.year === new Date().getFullYear(),
      )
      weeks.push({
        weekNumber: i + 1,
        startDate: getDays[0],
        isCurrent: isToday ? true : false,
        days: getDays,
      })
      counter += 1
    }

    return weeks
  }

  createYear(): ICalendarYear {
    return {
      locale: this.locale,
      monthes: this.getYearMonthes(),
      isCurrent: new Date().getFullYear() === this._year,
      year: this._year,
      weeksTotalCount: new CalendarWeek({ date: new Date(this._year, 0, 0) }).getWeeksTotalCountInYear(),
    }
  }
}

export default CalendarYear
