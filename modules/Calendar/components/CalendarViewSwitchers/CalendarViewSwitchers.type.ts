import { CalendarModeView } from '../../DefaultCalendar/default-calendar.type'

export interface CalendarViewSwitchersProps {
  selectedView: CalendarModeView
  onClick: (type: CalendarModeView) => void
}
