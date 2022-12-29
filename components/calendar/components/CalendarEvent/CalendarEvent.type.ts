export type CalendarEventType = 'personal' | 'group'

export interface ICalendarEventProps {
  id: string
  title: string
  eventStart?: string
  eventEnd?: string
  isCompact?: boolean
  type: CalendarEventType
  styles?: object
}

export interface ICalendarEvent {
  id: string
  title: string
  eventStart: string
  eventEnd: string
  type: CalendarEventType
}
