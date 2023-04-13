import { ICalendar } from '../DefaultCalendar/default-calendar.type'

export type ICalendarSchedule = Omit<ICalendar, 'view'> & {
  onHandleAddLesson?: (id: string) => void
  isLoading?: boolean
}
