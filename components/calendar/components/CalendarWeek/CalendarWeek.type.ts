import { IDay } from '../CalendarDay/CalendarDay.type'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

export interface ICalendarWeekProps {
  // year: number
  // monthIndex: number
  locale?: string
  events?: ICalendarEvent
}

export interface ICalendarWeekClassOptions {
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
