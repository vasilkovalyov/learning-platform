import CalendarDate, { ICreateDate } from './CalendarDate'
import CalendarDay, { IDayProps } from './CalendarDay'

export interface ICreateMonthProps {
  locale?: string
  date?: Date
}

export interface ICreateMonth {
  monthIndex: number
  monthName: string
  monthNumber: number
  monthShort: string
  year: number
  createMonthDays: () => ICreateDate[]
}

class CalendarMonth {
  private firstWeeksDay = 2
  private shiftIndex = this.firstWeeksDay - 1

  getMonthDays(year: number, monthIndex: number, locale = 'en-En'): ICreateDate[] {
    return this.createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays()
  }

  getMonthNumberOfDays(monthIndex: number, yearNumber: number = new Date().getFullYear()): number {
    return new Date(yearNumber, monthIndex + 1, 0).getDate()
  }

  getMonthesNames(locale = 'en-En') {
    const calendarDateInst = new CalendarDate()
    const monthesNames: {
      month: ReturnType<typeof calendarDateInst.createDate>['month']
      monthShort: ReturnType<typeof calendarDateInst.createDate>['monthShort']
      monthIndex: ReturnType<typeof calendarDateInst.createDate>['monthIndex']
      date: ReturnType<typeof calendarDateInst.createDate>['date']
    }[] = Array.from({ length: 12 })

    const d = new Date()
    monthesNames.forEach((_, i) => {
      const { month, monthIndex, monthShort, date } = calendarDateInst.createDate({
        locale,
        date: new Date(d.getFullYear(), d.getMonth() + i, 1),
      })
      monthesNames[monthIndex] = { month, monthIndex, monthShort, date }
    })

    return monthesNames
  }

  createMonthDays(monthIndex: number, year: number): ICreateDate[] {
    const days: ICreateDate[] = []

    for (let i = 0; i <= this.getMonthNumberOfDays(monthIndex, year) - 1; i++) {
      days[i] = new CalendarDay().getDay({
        dayNumber: i + 1,
        monthIndex: monthIndex,
        year: year,
      })
    }

    return days
  }

  getPrevMonthDays(): ICreateDate[] {
    const calendarDateInst = new CalendarDate()
    return this.createMonth({
      date: new Date(calendarDateInst.createDate().year, calendarDateInst.createDate().monthIndex - 1),
    }).createMonthDays()
  }

  getNextMonthDays(): ICreateDate[] {
    const calendarDateInst = new CalendarDate()
    return this.createMonth({
      date: new Date(calendarDateInst.createDate().year, calendarDateInst.createDate().monthIndex + 1),
    }).createMonthDays()
  }

  getDaysInMonth(): ICreateDate[] {
    return this.createMonth().createMonthDays()
  }

  getNumberPrevMonthDays(): number {
    const firstDay = this.getDaysInMonth()[0]
    const numberOfPrevMonthDays =
      firstDay.dayNumberInWeek - 1 - this.shiftIndex < 0
        ? 7 - (this.firstWeeksDay - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - this.shiftIndex
    return numberOfPrevMonthDays
  }

  getNumberNextMonthDays(): number {
    const monthNumberOfDays = this.getMonthNumberOfDays(
      new CalendarDate().createDate().monthIndex,
      new CalendarDate().createDate().year,
    )
    const lastDay = this.createMonth().createMonthDays()[monthNumberOfDays - 1]
    const numberOfNextMonthDays =
      7 - lastDay.dayNumberInWeek + this.shiftIndex > 6
        ? 7 - lastDay.dayNumberInWeek - (7 - this.shiftIndex)
        : 7 - lastDay.dayNumberInWeek + this.shiftIndex
    return numberOfNextMonthDays
  }

  getTotalDaysInView(): ICreateDate[] {
    const result: ICreateDate[] = []
    const prevMonthDays = this.getPrevMonthDays()
    const numberOfPrevMonthDays = this.getNumberPrevMonthDays()
    const nextMonthDays = this.getNextMonthDays()
    const numberOfNextMonthDays = this.getNumberNextMonthDays()
    const days = this.getDaysInMonth()
    const totalCalendarDays = days.length + numberOfPrevMonthDays + numberOfNextMonthDays

    for (let i = 0; i < numberOfPrevMonthDays; i++) {
      const inverted = numberOfPrevMonthDays
      result[i] = prevMonthDays[prevMonthDays.length - inverted]
    }
    for (let i = numberOfPrevMonthDays; i < totalCalendarDays - numberOfNextMonthDays; i++) {
      result[i] = days[i - numberOfPrevMonthDays]
    }
    for (let i = totalCalendarDays - numberOfNextMonthDays; i < totalCalendarDays; i++) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextMonthDays]
    }

    return result
  }

  createMonth(params?: ICreateMonthProps): ICreateMonth {
    const date = params?.date ?? new Date()
    const locale = params?.locale ?? 'en-En'
    const calendarDateInst = new CalendarDate()

    const d = calendarDateInst.createDate({ locale, date })
    const { month: monthName, year, monthNumber, monthIndex, monthShort } = d

    const createMonthDays = () => this.createMonthDays(monthIndex, year)

    return {
      monthIndex,
      monthName,
      monthNumber,
      monthShort,
      year,
      createMonthDays,
    }
  }
}

export default CalendarMonth
