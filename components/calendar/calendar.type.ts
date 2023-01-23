import { ICalendarEvent } from './components/CalendarEvent/CalendarEvent.type'
export enum CalendarModeView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface ICalendar {
  date: Date
  events?: ICalendarEvent[]
  locale?: string
  view: CalendarModeView
}

export type ICalendarSchedule = Omit<ICalendar, 'view'>
