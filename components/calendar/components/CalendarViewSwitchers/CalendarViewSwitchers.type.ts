import { CalendarModeViewType } from '../../calendar.type'

export interface ICalendarViewSwitchersProps {
  selectedView: CalendarModeViewType
  onClick: (type: CalendarModeViewType) => void
}

export interface ICalendarViewSwitcher {
  type: string
  title: string
}
