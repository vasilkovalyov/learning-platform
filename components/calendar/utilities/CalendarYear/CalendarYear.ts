import { ICalendarYearOptions, ICalendarYear } from './CalendarYear.type'
import CalendarMonth from '../CalendarMonth/CalendarMonth'
import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarWeek from '../CalendarWeek/CalendarWeek'
import { ICalendarWeek } from '../CalendarWeek/CalendarWeek.type'
import { IMonth } from '../CalendarMonth/CalendarMonth.type'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import { localeDefault, weekDaysCount } from '../../constants'

class CalendarYear {
  private _weeks: number
  private _year: number
  private _monthes: IMonth[] | []
  locale: string
  events: ICalendarEvent[]

  constructor(options: ICalendarYearOptions) {
    this._year = options.year ?? new Date().getFullYear()
    this.locale = options?.locale ?? localeDefault
    this._monthes = this.getYearMonthes()
    this._weeks = new CalendarWeek({ date: new Date(this._year, 0, 0) }).getWeeksInYear()
    this.events = options.events || []
  }

  get weeks() {
    return this._weeks
  }

  get year(): number {
    return this._year
  }

  set year(year: number) {
    this._year = year
  }

  get monthes(): IMonth[] {
    return this._monthes
  }

  set monthes(monthItems: IMonth[]) {
    this._monthes = monthItems
  }

  getYearMonthes(): IMonth[] {
    const monthes: IMonth[] = []
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
    const totalDays = [...weekInst.getPrevDaysInFirstWeek(), ...this.getYearDays(), ...weekInst.getPastDaysInLastWeek()]
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
      weeks: new CalendarWeek({ date: new Date(this._year, 0, 0) }).getWeeksInYear(),
    }
  }
}

export default CalendarYear
