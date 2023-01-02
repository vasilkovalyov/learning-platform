import React from 'react'
import cn from 'classnames'

import List from 'antd/lib/list'

import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { ICalendarHoursProps } from './CalendarHours.type'

function CalendarHours({ from, to, className }: ICalendarHoursProps) {
  const hoursList = CalendarDayClass.getDayHours(from, to)

  return (
    <List split={false} className={cn('calendar-day-hours', className)}>
      {hoursList.map((item, key) => (
        <List.Item key={key} className="calendar-day-hours__item font-semibold color-grey">
          {item}
        </List.Item>
      ))}
    </List>
  )
}

export default CalendarHours
