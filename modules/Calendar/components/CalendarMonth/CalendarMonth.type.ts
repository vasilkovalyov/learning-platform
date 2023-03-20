import { IDay } from '../CalendarDay/CalendarDay.type'
import { CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

export interface CalendarMonthProps {
  date: Date
  today?: Date
  locale?: string
  events?: CalendarEventType[]
}

export interface ICalendarClassMonthOptions {
  date: Date
  locale?: string
}

export interface IMonth {
  monthIndex: number
  monthName: string
  monthNumber: number
  monthShort: string
  year: number
  monthDays: IDay[]
  monthDaysFullView: IDay[]
  isCurrent: boolean
}

export interface IMonthName {
  month: string
  monthShort: string
  monthIndex: number
  date: Date
}
