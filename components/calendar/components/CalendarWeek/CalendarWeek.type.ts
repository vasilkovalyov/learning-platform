import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

export interface ICalendarWeekProps {
  date: Date
  today?: Date
  locale?: string
  events?: ICalendarEvent[]
}

export interface ICalendarWeekClassOptions {
  date: Date
  locale?: string
  weekStartNumber?: number
}
