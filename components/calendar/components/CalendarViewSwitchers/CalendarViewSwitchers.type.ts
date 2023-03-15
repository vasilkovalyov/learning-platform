import { CalendarModeView } from '../../calendar.type'

export interface ICalendarViewSwitchersProps {
  selectedView: CalendarModeView
  onClick: (type: CalendarModeView) => void
}

export interface ICalendarViewSwitcher {
  type: string
  title: string
}
