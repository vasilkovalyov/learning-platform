export type CalendarEventType = 'personal' | 'group' | 'course'

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
