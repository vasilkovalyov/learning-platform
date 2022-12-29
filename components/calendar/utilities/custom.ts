import { ICalendarEvent, CalendarEventType } from '../components/CalendarEvent/CalendarEvent.type'

export interface IEventsArrayForDay {
  id: string
  title: string
  eventStart: string
  eventEnd: string
  type: CalendarEventType
  style: {
    top: number
    height: number
  }
}

export function getEventsArrayForDay(date: Date, events: ICalendarEvent[] = []): IEventsArrayForDay[] | null {
  const cellHeight = 100
  const startHourWith = 8
  const filteredEvents = events.filter((e) => new Date(e.eventStart).getDate() === date.getDate())

  if (!filteredEvents.length) return null

  return filteredEvents.map((item) => {
    const dateStart = new Date(item.eventStart)
    const dateEnd = new Date(item.eventEnd)
    const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / 60
    const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / 60
    const topPosition = cellHeight * (hourStartWithTimeZone - startHourWith + dateStart.getMinutes() / 60)
    const height = (hourEndWithTimeZone - hourStartWithTimeZone + dateEnd.getMinutes() / 60) * cellHeight
    return {
      id: item.id,
      title: item.title,
      eventStart: `${dateStart.getHours()}:${dateStart.getMinutes()}`,
      eventEnd: `${dateEnd.getHours()}:${dateEnd.getMinutes()}`,
      type: item.type,
      style: {
        top: topPosition,
        height: height,
      },
    }
  })
}
