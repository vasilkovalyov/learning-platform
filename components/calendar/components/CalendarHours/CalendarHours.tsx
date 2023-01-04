import React from 'react'
import cn from 'classnames'

import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { ICalendarHoursProps } from './CalendarHours.type'

function CalendarHours({ from, to, className }: ICalendarHoursProps) {
  const hoursList = CalendarDayClass.getDayHours(from, to)

  return (
    <ul className={cn('calendar-day-hours', className)}>
      {hoursList.map((item, key) => (
        <li key={key} className="calendar-day-hours__item font-semibold color-grey">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default CalendarHours
