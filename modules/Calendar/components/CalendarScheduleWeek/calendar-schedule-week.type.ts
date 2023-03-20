import { ICalendar } from '../../DefaultCalendar/default-calendar.type'

export interface CalendarScheduleWeekProps<T extends object> extends Omit<ICalendar, 'view'> {
  children?: React.ReactNode
  selectedProps?: (props: T) => void
  positionComponent?: (params: Partial<DOMRect>) => void
}
