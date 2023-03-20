import { ICalendar } from '../../DefaultCalendar/default-calendar.type'

export interface CalendarScheduleWeekProps extends Omit<ICalendar, 'view'> {
  children?: React.ReactNode
  selectedProps?: (props: object) => void
  positionComponent?: (params: Partial<DOMRect>) => void
}
