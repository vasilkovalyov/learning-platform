import React from 'react'
import CalendarEvent from '../CalendarEvent'
import { CalendarEventsProps } from './CalendarEventsList.type'

import { calendarCellHeight, calendarStartHourFrom, hourMinutes } from '../../constants'

function CalendarEvents({ events }: CalendarEventsProps) {
  return (
    <>
      {events.map((event) => {
        const timeStart = event.eventStart.split('T')[1]
        const timeStartHours = timeStart.split(':')[0]
        const timeStartMinutes = timeStart.split(':')[1]

        const timeEnd = event.eventEnd.split('T')[1]
        const timeEndHours = timeEnd.split(':')[0]
        const timeEndMinutes = timeEnd.split(':')[1]

        const topPosition =
          calendarCellHeight * (+timeStartHours - calendarStartHourFrom + +timeStartMinutes / hourMinutes)
        const startMin = +timeStart.split(':')[0] * hourMinutes + +timeStartMinutes
        const endMin = +timeEndHours * hourMinutes + +timeEndMinutes
        const height = ((endMin - startMin) / hourMinutes) * calendarCellHeight

        return (
          <CalendarEvent
            key={event.id}
            id={event.id}
            title={event.title}
            eventStart={`${timeStartHours}:${+timeStartMinutes === 0 ? '00' : timeStartMinutes}`}
            eventEnd={`${timeEndHours}:${+timeEndMinutes === 0 ? '00' : timeEndMinutes}`}
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
