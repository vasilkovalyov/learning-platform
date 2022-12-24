import { ICalendarEventOptions, ICalendarEvent } from './CalendarEvent.type'

class CalendarEvent {
  id: string
  title: string
  description: string
  duration: {
    from: Date
    to: Date
  }

  constructor(options: ICalendarEventOptions) {
    this.id = options.id
    this.title = options.title
    this.description = options.description
    this.duration = options.duration
  }

  getEventInfo(): ICalendarEvent {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      duration: this.duration,
    }
  }
}
export default CalendarEvent
