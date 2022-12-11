import CalendarMonth from './CalendarMonth'
import CalendarDate, { ICreateDate } from './CalendarDate'

export interface ICalendarEventProps {
  id: string
  date: ICreateDate
  title: string
  timeStart: string
  timeEnd: string
}

class CalendarEvent {
  id: string
  date: ICreateDate
  title: string
  timeStart: string
  timeEnd: string

  constructor(options: ICalendarEventProps) {
    this.id = options.id
    this.date = options.date
    this.title = options.title
    this.timeStart = options.timeStart
    this.timeEnd = options.timeEnd
  }

  getEvent(): ICalendarEventProps {
    return {
      id: this.id,
      title: this.title,
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
      date: this.date,
    }
  }
}

export default CalendarEvent
