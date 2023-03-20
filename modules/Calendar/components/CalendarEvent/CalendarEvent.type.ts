export type CalendarEventCategory = 'personal' | 'group' | 'course'

export interface CalendarEventProps {
  id: string
  title: string
  subtitle?: string
  eventStart?: string
  eventEnd?: string
  isCompact?: boolean
  type: CalendarEventCategory
  styles?: object
}

export type CalendarEventType = {
  id: string
  title: string
  subtitle?: string
  eventStart: string
  eventEnd: string
  type: CalendarEventCategory
}
