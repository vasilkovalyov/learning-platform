import { CalendarEventCategory } from '../components/CalendarEvent/CalendarEvent.type'

export interface CalendarEventType {
  id: string
  title: string
  subtitle?: string
  eventStart: string
  eventEnd: string
  type: CalendarEventCategory
}
