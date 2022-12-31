export enum CalendarEventTypeColor {
  PERSONAL_LESSON = '#D1EAE7',
  GROUP_LESSON = '#FAEEDF',
  AVAILABLE_TIME = '#E9F4FF',
  UNAVAILABLE_TIME = '#F2F5FA',
}

export interface ICalendarEventType {
  type: string
  title: string
  color: CalendarEventTypeColor
}
