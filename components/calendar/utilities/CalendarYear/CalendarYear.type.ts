import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'
import { IMonth } from '../CalendarMonth/CalendarMonth.type'

export interface ICalendarYearOptions {
  locale?: string
  year: number
  events?: ICalendarEvent[]
}

export interface ICalendarYear {
  locale: string
  year: number
  isCurrent: boolean
  monthes: IMonth[]
  weeks: number
}
