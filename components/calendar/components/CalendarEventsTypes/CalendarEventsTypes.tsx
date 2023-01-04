import React from 'react'
import { ICalendarEventsTypesProps } from './CalendarEventsTypes.type'

function CalendarEventsTypes({ items }: ICalendarEventsTypesProps) {
  return (
    <div className="calendar-event-types">
      {items.map((lessonType, index) => (
        <div key={index}>
          <div>
            <div className="calendar-event-types__color" style={{ backgroundColor: lessonType.color }}></div>
            <span>{lessonType.title}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CalendarEventsTypes
