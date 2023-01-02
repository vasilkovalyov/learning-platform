import React from 'react'
import CalendarEvent from '../CalendarEvent/CalendarEvent'
import { ICalendarEventsProps } from './CalendarEvents.type'

import { calendarCellHeight, calendarStartHourFrom, hourMinutes } from '../../constants'

function CalendarEvents({ events }: ICalendarEventsProps) {
  return (
    <>
      {events.map((event) => {
        const dateStart = new Date(event.eventStart)
        const dateEnd = new Date(event.eventEnd)
        const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / hourMinutes
        const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / hourMinutes
        const topPosition =
          calendarCellHeight * (hourStartWithTimeZone - calendarStartHourFrom + dateStart.getMinutes() / hourMinutes)
        const height =
          (hourEndWithTimeZone - hourStartWithTimeZone + dateEnd.getMinutes() / hourMinutes) * calendarCellHeight -
          (dateEnd.getMinutes() / hourMinutes) * calendarCellHeight
        return (
          <CalendarEvent
            key={event.id}
            id={event.id}
            title={event.title}
            eventStart={`${hourStartWithTimeZone}:${dateStart.getMinutes()}`}
            eventEnd={`${hourEndWithTimeZone}:${dateEnd.getMinutes()}`}
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
