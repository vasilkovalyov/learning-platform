import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Icon from '../../../../components/Generic/Icon'

import CalendarEvent from '../CalendarEvent'
import { CalendarEventCategory, CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

import { CalendarMonthProps } from './CalendarMonth.type'
import { formatDate } from '../../utilities/date'
import { localeDefault } from '../../constants'

import { useCalendarMonth } from './useCalendarMonth'

export default function CalendarMonth({
  date = new Date(),
  events,
  today = new Date(),
  locale = localeDefault,
}: CalendarMonthProps) {
  const { monthName, year, todayDay, monthIndex, monthDays, weekNames, nextMonth, prevMonth } = useCalendarMonth(
    date,
    today,
    locale,
  )

  function renderEvents(date: Date, events: CalendarEventType[] = []) {
    const filteredEvents = events.filter(
      (e) =>
        new Date(e.eventStart).getFullYear() === date.getFullYear() &&
        new Date(e.eventStart).getMonth() === date.getMonth() &&
        new Date(e.eventStart).getDate() === date.getDate(),
    )

    if (!filteredEvents.length) return null

    const uniqEvents = { personal: 0, group: 0, course: 0 }
    filteredEvents.forEach((event: CalendarEventType) => (uniqEvents[event.type] += 1))
    return Object.entries(uniqEvents).map((item, index) => {
      const [key, count] = item
      if (!count) return null
      const lessons = (lessonCount: number) => `${item[1]} ${lessonCount === 1 ? 'lesson' : 'lessons'}`
      return (
        <CalendarEvent
          key={index}
          id={key}
          title={lessons(count)}
          type={key as CalendarEventCategory}
          isCompact={true}
        />
      )
    })
  }

  return (
    <Box className="calendar-month">
      <Box className="calendar-month__controls" marginBottom={2}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button variant="text" onClick={prevMonth} className="calendar-month__control-button">
            <Icon icon="chevron-left" size={20} />
          </Button>
          <Typography variant="h4" className="MuiTypography calendar-month__month font-bold color-black">
            <span>{monthName}</span>
            <span>{year}</span>
          </Typography>
          <Button variant="text" onClick={nextMonth} className="calendar-month__control-button">
            <Icon icon="chevron-right" size={20} />
          </Button>
        </Stack>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="body2" className="MuiTypography calendar-month__today-info font-semibold color-grey-3">
          {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
        </Typography>
      </Box>
      <Box className="calendar-week-days">
        {weekNames.map((week, key) => (
          <Box
            key={key}
            className={cn('calendar-week-days__cell ', {
              active: todayDay.day === week && todayDay.monthIndex === monthIndex && todayDay.year === year,
            })}
          >
            <Typography variant="body2" className="MuiTypography font-semibold">
              {week}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className="calendar-month__days">
        {monthDays.map((day, key) => (
          <Box
            key={key}
            className={cn(
              'calendar-month__day-cell font-semibold',
              { 'calendar-month__day-cell--today': day.isToday && todayDay.monthIndex === monthIndex },
              { 'calendar-month__day-cell--current-month': day.isCurrentMonth },
              { 'calendar-month__day-cell--another-month': !day.isCurrentMonth },
              { 'calendar-month__day-cell--weekend': day.isWeekend },
            )}
          >
            <Typography variant="h4" className="MuiTypography calendar-month__day-cell-day-number">
              {day.dayNumber}
            </Typography>
            <Box className="calendar-month__day-cell-events">{renderEvents(day.date, events)}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
