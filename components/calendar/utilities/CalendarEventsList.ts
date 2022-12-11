import CalendarDate from './CalendarDate'
import CalendarEvent, { ICalendarEventProps } from './CalendarEvent'

export interface ICalendarEventsListProps {
  events: CalendarEvent[]
}

class CalendarEventsList {
  events: CalendarEvent[]

  constructor(options: ICalendarEventsListProps) {
    this.events = options.events
  }

  getEventByMonthAndYear(month: number, year: number) {
    return this.events.filter((event) => {
      if (month === event.date.monthIndex && year === event.date.year) {
        return new CalendarEvent(event).getEvent()
      }
    })
  }
}

export default CalendarEventsList
