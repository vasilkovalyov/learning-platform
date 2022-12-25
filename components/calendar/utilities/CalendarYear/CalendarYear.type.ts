import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'
import CalendarMonth from '../CalendarMonth/CalendarMonth'

export interface ICalendarYearOptions {
  locale?: string
  year: number
  events?: ICalendarEvent[]
}

export interface ICalendarYear {
  locale: string
  year: number
  isCurrent: boolean
  monthes: CalendarMonth[]
  weeksTotalCount: number
}
