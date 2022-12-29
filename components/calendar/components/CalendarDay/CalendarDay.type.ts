import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

export interface ICalendarDayProps {
  date: Date
  locale?: string
  events?: ICalendarEvent[]
}

export interface ICalendarDayClassOptions {
  date?: Date
  locale?: string
  events?: ICalendarEvent[]
  weekendDays?: string[]
  isCurrentMonth?: boolean
}

export interface IDay {
  date: Date
  dayNumber: number
  day: string
  dayShort: string
  dayNumberInWeek: number
  year: number
  month: string
  monthShort: string
  monthNumber: number
  monthIndex: number
  timestamp: number
  isToday: boolean
  isWeekend: boolean
  isCurrentMonth: boolean
}
