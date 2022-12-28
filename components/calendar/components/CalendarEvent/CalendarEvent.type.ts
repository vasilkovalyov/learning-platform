export type CalendarEventType = 'personal' | 'group'

export interface ICalendarEventProps {
  id: string
  title: string
  dateFrom?: Date
  dateTo?: Date
  isCompact?: boolean
  type: CalendarEventType
  styles?: object
}

export interface ICalendarEventOptions {
  id: string
  title: string
  description: string
  duration: {
    from: Date
    to: Date
  }
}

export interface ICalendarEvent {
  id: string
  title: string
  duration: {
    from: Date
    to: Date
  }
  type: 'personal' | 'group'
}
