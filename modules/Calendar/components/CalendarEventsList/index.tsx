import React from 'react'
import CalendarEvent from '../CalendarEvent'
import { CalendarEventsProps } from './CalendarEventsList.type'

import { calendarCellHeight, calendarStartHourFrom, hourMinutes } from '../../constants'

function CalendarEvents({ events }: CalendarEventsProps) {
  return (
    <>
      {events.map((event) => {
        const dateStart = new Date(event.eventStart)
        const dateEnd = new Date(event.eventEnd)

        const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / hourMinutes
        const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / hourMinutes
        const topPosition =
          calendarCellHeight * (hourStartWithTimeZone - calendarStartHourFrom + dateStart.getMinutes() / hourMinutes)

        const startMin = hourStartWithTimeZone * hourMinutes + dateStart.getMinutes()
        const endMin = hourEndWithTimeZone * hourMinutes + dateEnd.getMinutes()
        const height = ((endMin - startMin) / hourMinutes) * calendarCellHeight

        return (
          <CalendarEvent
            key={event.id}
            id={event.id}
            title={event.title}
            eventStart={`${hourStartWithTimeZone}:${dateStart.getMinutes() === 0 ? '00' : dateStart.getMinutes()}`}
            eventEnd={`${hourEndWithTimeZone}:${dateEnd.getMinutes() === 0 ? '00' : dateEnd.getMinutes()}`}
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
