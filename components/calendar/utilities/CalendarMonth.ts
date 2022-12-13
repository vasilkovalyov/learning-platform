import CalendarDate, { ICreateDate } from './CalendarDate'
import CalendarDay, { IDayProps } from './CalendarDay'

export interface ICreateMonthProps {
  locale?: string
  date?: Date
}

export interface ITotalDaysInViewProps {
  year?: number
  monthIndex?: number
}

export interface ICreateMonth {
  monthIndex: number
  monthName: string
  monthNumber: number
  monthShort: string
  year: number
  createMonthDays: () => ICreateDate[]
}

export interface IMonth {
  month: string
  monthIndex: number
  monthShort: string
  date: Date
}

class CalendarMonth {
  private firstWeeksDay = 2
  private shiftIndex = this.firstWeeksDay - 1
  private DAYS_IN_WEEK = 7

  getMonthDays(year: number, monthIndex: number, locale = 'en-En'): ICreateDate[] {
    return this.createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays()
  }

  isCurrentMonth(year: number, monthIndex: number): boolean {
    return new Date().getMonth() === monthIndex && year === new Date().getFullYear()
  }

  getMonthNumberOfDays(monthIndex: number, yearNumber: number = new Date().getFullYear()): number {
    return new Date(yearNumber, monthIndex + 1, 0).getDate()
  }

  getMonthesNames(locale = 'en-En'): IMonth[] {
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

  getNumberPrevMonthDays(firstDay: ICreateDate): number {
    const numberOfPrevMonthDays =
      firstDay.dayNumberInWeek - 1 - this.shiftIndex < 0
        ? this.DAYS_IN_WEEK - (this.firstWeeksDay - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - this.shiftIndex
    return numberOfPrevMonthDays
  }

  getNumberNextMonthDays(lastDay: ICreateDate): number {
    const numberOfNextMonthDays =
      this.DAYS_IN_WEEK - lastDay.dayNumberInWeek + this.shiftIndex > 6
        ? this.DAYS_IN_WEEK - lastDay.dayNumberInWeek - (this.DAYS_IN_WEEK - this.shiftIndex)
        : this.DAYS_IN_WEEK - lastDay.dayNumberInWeek + this.shiftIndex
    return numberOfNextMonthDays
  }

  getTotalDaysInView(params?: ITotalDaysInViewProps): ICreateDate[] {
    const createDateInst = new CalendarDate()

    const selectedYear = params?.year ?? createDateInst.createDate().year
    const selectedMonthIndex = params?.monthIndex ?? createDateInst.createDate().monthIndex

    const days = this.createMonth({
      date: new Date(selectedYear, selectedMonthIndex),
    }).createMonthDays()

    return days
  }

  getTotalDaysInViewMonth(params?: ITotalDaysInViewProps): ICreateDate[] {
    const createDateInst = new CalendarDate()

    const selectedYear = params?.year ?? createDateInst.createDate().year
    const selectedMonthIndex = params?.monthIndex ?? createDateInst.createDate().monthIndex

    const monthNumberOfDays = this.getMonthNumberOfDays(selectedMonthIndex, selectedYear)

    const days = this.createMonth({
      date: new Date(selectedYear, selectedMonthIndex),
    }).createMonthDays()

    const prevMonthDays = this.createMonth({
      date: new Date(selectedYear, selectedMonthIndex - 1),
    }).createMonthDays()
    const nextMonthDays = this.createMonth({
      date: new Date(selectedYear, selectedMonthIndex + 1),
    }).createMonthDays()

    const firstDay = days[0]
    const lastDay = days[monthNumberOfDays - 1]

    const numberOfPrevDays = this.getNumberPrevMonthDays(firstDay)
    const numberOfNextDays = this.getNumberNextMonthDays(lastDay)

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays
    const result: ICreateDate[] = []

    for (let i = 0; i < numberOfPrevDays; i++) {
      const inverted = numberOfPrevDays - i
      result[i] = prevMonthDays[prevMonthDays.length - inverted]
    }
    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i++) {
      result[i] = days[i - numberOfPrevDays]
    }
    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i++) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays]
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
