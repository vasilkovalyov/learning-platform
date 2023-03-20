import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import CalendarHours from '../CalendarHours'
import CalendarEvents from '../CalendarEventsList'
import { CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

import CalendarDayClass from './CalendarDay.class'

import { CalendarDayProps } from './CalendarDay.type'
import { getCurrentTime } from '../../utilities/time'
import { formatDate } from '../../utilities/date'
import { getFilteredEventByDate } from '../../utilities/custom'

import { calendarStartHourFrom, calendarStartHourTo, calendarCellHeight, localeDefault } from '../../constants'

import { useCalendarDay } from './useCalendarDay'

export default function CalendarDay({ date = new Date(), events = [], locale = localeDefault }: CalendarDayProps) {
  const splitedCurrentTime = getCurrentTime(new Date()).split(':')
  const { day, year, nextDay, prevDay, getCurrentMonthName } = useCalendarDay(date, locale)
  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)
  const currentHour = parseInt(splitedCurrentTime[0])

  function renderEvents(date: Date, events: CalendarEventType[] = []) {
    const filteredEvents = getFilteredEventByDate(date, events)

    if (!filteredEvents.length) return null

    return <CalendarEvents events={filteredEvents} />
  }

  const getCurrentTimePosition = () => {
    const [hour, minute] = splitedCurrentTime
    return (parseInt(hour) - calendarStartHourFrom) * calendarCellHeight + (parseInt(minute) / 60) * calendarCellHeight
  }

  return (
    <Box className="calendar-day">
      <Box className="calendar-day__top-info">
        <Box marginBottom={1}>
          <Typography
            variant="h4"
            className={cn('MuiTypography calendar-day__date font-bold', {
              'calendar-day__date--active': day.isToday,
            })}
          >
            <span>{formatDate(day.date, 'DD')}</span>
            <span>{getCurrentMonthName()}</span>
            <span>{year}</span>
          </Typography>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="body2" className="MuiTypography calendar-day__today-info font-semibold color-grey-3">
            {`${day.day} ${getCurrentTime(new Date())}`}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} marginBottom={2} className="calendar-day__controls">
          <Button variant="text" onClick={prevDay} className="calendar-day__control-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.77049 9.66231C6.0765 9.96832 6.0765 10.4645 5.77049 10.7705C5.46447 11.0765 4.96832 11.0765 4.66231 10.7705L0.235239 6.34342C0.233333 6.34155 0.231436 6.33967 0.229544 6.33778C-0.0764716 6.03177 -0.076472 5.53562 0.229543 5.2296L4.66227 0.796877C4.96828 0.490861 5.46443 0.490861 5.77045 0.796877C6.07646 1.10289 6.07646 1.59904 5.77045 1.90506L1.89184 5.78366L5.77049 9.66231Z"
                fill="#454B58"
              />
            </svg>
          </Button>
          <Button variant="text" onClick={nextDay} className="calendar-day__control-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.229512 9.66231C-0.0765041 9.96832 -0.0765038 10.4645 0.229512 10.7705C0.535527 11.0765 1.03168 11.0765 1.33769 10.7705L5.76476 6.34342C5.76667 6.34155 5.76856 6.33967 5.77046 6.33778C6.07647 6.03177 6.07647 5.53562 5.77046 5.2296L1.33773 0.796877C1.03172 0.490861 0.535567 0.490861 0.229552 0.796877C-0.0764637 1.10289 -0.0764646 1.59904 0.229551 1.90506L4.10816 5.78366L0.229512 9.66231Z"
                fill="#454B58"
              />
            </svg>
          </Button>
        </Stack>
      </Box>
      <Box className="calendar-day__body">
        <Box className="calendar-day__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} />
        </Box>
        <Box className="calendar-day__body-right">
          <Box className="calendar-day-times calendar-day-times--day">
            {currentHour < calendarStartHourFrom || currentHour < calendarStartHourTo ? (
              <Box className="calendar-day-times__timeline" style={{ top: getCurrentTimePosition() + 'px' }}></Box>
            ) : null}
            {renderEvents(day.date, events)}
            <List className="calendar-day__cell-list">
              {dayHours.map((_, key) => (
                <ListItem key={key} className="calendar-day__cell"></ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
