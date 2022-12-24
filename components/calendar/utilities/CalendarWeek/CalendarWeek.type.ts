import { IDay } from '../CalendarDay/CalendarDay.type'

export interface ICalendarWeekOptions {
  date: Date
  locale?: string
  weekStartNumber?: number
}

export interface ICalendarWeek {
  isCurrent: boolean
  startDate: IDay
  days: IDay[]
  weekNumber: number
}
