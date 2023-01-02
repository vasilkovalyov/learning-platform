export enum CalendarEventTypeColor {
  PERSONAL_LESSON = '#D1EAE7',
  GROUP_LESSON = '#FAEEDF',
  AVAILABLE_TIME = '#E9F4FF',
  UNAVAILABLE_TIME = '#F2F5FA',
}

export enum CalendarLessonTypeColor {
  PERSONAL_LESSON = '#C0D1FF',
  GROUP_LESSON = '#A7E6C8',
  COURSE_LESSON = '#FCAAAA',
}

export interface ICalendarEventType {
  type: string
  title: string
  color: string
}

export interface ICalendarEventsTypesProps {
  items: ICalendarEventType[]
}
