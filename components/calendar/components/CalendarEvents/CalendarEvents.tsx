import React from 'react'
import CalendarEvent from '../CalendarEvent/CalendarEvent'
import { ICalendarEventsProps } from './CalendarEvents.type'

import { calendarCellHeight, calendarStartHourFrom } from '../../constants'

function CalendarEvents({ events }: ICalendarEventsProps) {
  const HOUR_MINUTE = 60
  return (
    <>
      {events.map((event) => {
        const dateStart = new Date(event.eventStart)
        const dateEnd = new Date(event.eventEnd)
        const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / HOUR_MINUTE
        const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / HOUR_MINUTE
        const topPosition =
          calendarCellHeight * (hourStartWithTimeZone - calendarStartHourFrom + dateStart.getMinutes() / HOUR_MINUTE)
        const height =
          (hourEndWithTimeZone - hourStartWithTimeZone + dateEnd.getMinutes() / HOUR_MINUTE) * calendarCellHeight
        return (
          <CalendarEvent
            key={event.id}
            id={event.id}
            title={event.title}
            eventStart={`${dateStart.getHours()}:${dateStart.getMinutes()}`}
            eventEnd={`${dateEnd.getHours()}:${dateEnd.getMinutes()}`}
            type={event.type}
            styles={{
              top: topPosition,
              height: height,
            }}
          />
        )
      })}
    </>
  )
}

export default CalendarEvents
