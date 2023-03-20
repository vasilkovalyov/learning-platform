import { CalendarEventType } from '../components/CalendarEvent/CalendarEvent.type'
export enum CalendarModeView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface ICalendar {
  date: Date
  events?: CalendarEventType[]
  locale?: string
  view: CalendarModeView
}
