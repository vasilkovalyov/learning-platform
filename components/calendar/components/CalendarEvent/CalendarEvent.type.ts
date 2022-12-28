export type CalendarEventType = 'personal' | 'group'
export interface ICalendarEvent {
  id: string
  title: string
  dateFrom?: Date
  dateTo?: Date
  isCompact?: boolean
  type: CalendarEventType
  styles?: object
}
