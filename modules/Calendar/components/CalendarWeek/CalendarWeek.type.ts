import { CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

export interface CalendarWeekProps {
  date: Date
  today?: Date
  locale?: string
  events?: CalendarEventType[]
}

export interface ICalendarWeekClassOptions {
  date?: Date
  locale?: string
  weekStartNumber?: number
}
