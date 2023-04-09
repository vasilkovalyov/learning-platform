import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Icon from '../../../../components/Generic/Icon'

import CalendarHours from '../CalendarHours'

import CalendarEvents from '../CalendarEventsList'
import { CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { CalendarWeekProps } from './CalendarWeek.type'
import { formatDate } from '../../utilities/date'
import { calendarStartHourFrom, calendarStartHourTo, localeDefault } from '../../constants'
import { getFilteredEventByDate } from '../../utilities/custom'

import { useCalendarWeek } from './useCalendarWeek'

export default function CalendarWeek({
  date = new Date(),
  today = new Date(),
  events,
  locale = localeDefault,
}: CalendarWeekProps) {
  const { day, todayDay, weekNames, week, nextWeek, prevWeek, getCurrentMonthName } = useCalendarWeek(
    date,
    today,
    locale,
  )

  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)

  function renderEvents(date: Date, events: CalendarEventType[] = []) {
    const filteredEvents = getFilteredEventByDate(date, events)
    if (!filteredEvents.length) return null

    return <CalendarEvents events={filteredEvents} />
  }

  return (
    <div className="calendar-week">
      <Box className="calendar-week__top-info">
        <Box marginBottom={1}>
          <Typography variant="h4" className="MuiTypography calendar-week__date font-bold color-black">
            <span>{getCurrentMonthName()}</span>
            <span>{day.year}</span>
          </Typography>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="body2" className="MuiTypography calendar-week__today-info font-semibold color-grey-3">
            {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} marginBottom={2} className="calendar-week__controls">
          <Button variant="text" onClick={prevWeek} className="calendar-week__control-button">
            <Icon icon="chevron-left" size={20} />
          </Button>
          <Button variant="text" onClick={nextWeek} className="calendar-week__control-button">
            <Icon icon="chevron-right" size={20} />
          </Button>
        </Stack>
      </Box>
      <div className="calendar-week__body">
        <div className="calendar-week__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} />
        </div>
        <div className="calendar-week__body-right">
          <div className="calendar-week-days">
            {weekNames.map((weekName, key) => (
              <div
                key={key}
                className={cn('calendar-week-days__cell ta-c', {
                  active: week[key].isToday,
                })}
              >
                <Typography variant="h4" className="MuiTypography calendar-week-days__cell-day-number font-semibold">
                  {week[key].dayNumber < 10 ? `0${week[key].dayNumber}` : week[key].dayNumber}
                </Typography>
                <Typography variant="body2" className="MuiTypography calendar-week-days__cell-weekname font-semibold">
                  {weekName}
                </Typography>
              </div>
            ))}
          </div>
          <div className="calendar-day-times calendar-day-times--week">
            {weekNames.map((weekName, key) => (
              <div
                key={key}
                className={cn('calendar-day-times__item', {
                  weekend: weekName === 'Saturday' || weekName === 'Sunday',
                })}
              >
                {renderEvents(week[key].date, events)}
                {dayHours.map((_, key) => (
                  <div key={key} className="calendar-day-times__cell"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
