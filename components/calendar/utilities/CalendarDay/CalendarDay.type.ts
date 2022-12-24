import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

export interface ICalendarDayOptions {
  date?: Date
  locale?: string
  events?: ICalendarEvent[]
}

export interface IDay {
  date: Date
  dayNumber: number
  day: string
  dayShort: string
  dayNumberInWeek: number
  year: number
  yearShort: string
  month: string
  monthShort: string
  monthNumber: number
  monthIndex: number
  timestamp: number
  isToday: boolean
  events?: ICalendarEvent[]
}
