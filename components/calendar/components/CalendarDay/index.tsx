import React, { useState } from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import Icon from '../../../Generic/Icon'

import CalendarHours from '../CalendarHours'
import CalendarEvents from '../CalendarEvents'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import CalendarMonthClass from '../CalendarMonth/CalendarMonth.class'
import CalendarDayClass from './CalendarDay.class'

import { IDay } from './CalendarDay.type'

import { ICalendarDayProps } from './CalendarDay.type'
import { getCurrentTime } from '../../utilities/time'
import { formatDate } from '../../utilities/date'
import { getFilteredEventByDate } from '../../utilities/custom'
import { calendarStartHourFrom, calendarStartHourTo, calendarCellHeight } from '../../constants'

export default function CalendarDay({ date = new Date(), events = [], locale = 'en-En' }: ICalendarDayProps) {
  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)
  const currentHour = parseInt(getCurrentTime(new Date()).split(':')[0])

  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [year, setYear] = useState<number>(date.getFullYear())
  const [day, setDay] = useState<IDay>(new CalendarDayClass({ date: date, locale }).getDay())

  function renderEvents(date: Date, events: ICalendarEvent[] = []) {
    const filteredEvents = getFilteredEventByDate(date, events)

    if (!filteredEvents.length) return null

    return <CalendarEvents events={filteredEvents} />
  }

  function prevDay() {
    if (day.dayNumber <= 1) {
      if (monthIndex === 0) {
        const prevYear = year - 1
        const prevMonthDay = new CalendarDayClass({ date: new Date(prevYear, 12, 0) }).getDay()
        setYear(prevYear)
        setMonthIndex(11)
        setDay(prevMonthDay)
      } else {
        const prevMonth = monthIndex - 1
        const prevMonthDay = new CalendarDayClass({ date: new Date(year, monthIndex, 0) }).getDay()
        setDay(prevMonthDay)
        setMonthIndex(prevMonth)
      }
    } else {
      const prevDay = new CalendarDayClass({ date: new Date(year, monthIndex, day.dayNumber - 1) }).getDay()
      setDay(prevDay)
    }
  }

  function nextDay() {
    if (day.dayNumber >= new Date(year, monthIndex + 1, 0).getDate()) {
      if (monthIndex === 11) {
        const nextYear = year + 1
        const nextMonthDay = new CalendarDayClass({ date: new Date(nextYear, 0, 1) }).getDay()
        setYear(nextYear)
        setMonthIndex(0)
        setDay(nextMonthDay)
      } else {
        const nextMonth = monthIndex + 1
        const nextMonthDay = new CalendarDayClass({ date: new Date(year, nextMonth, 1) }).getDay()
        setMonthIndex(nextMonth)
        setDay(nextMonthDay)
      }
    } else {
      const nextDay = new CalendarDayClass({ date: new Date(year, monthIndex, day.dayNumber + 1) }).getDay()
      setDay(nextDay)
    }
  }

  const getCurrentTimePosition = () => {
    const [hour, minute] = getCurrentTime(new Date()).split(':')
    return (parseInt(hour) - calendarStartHourFrom) * calendarCellHeight + (parseInt(minute) / 60) * calendarCellHeight
  }

  return (
    <Box className="calendar-day">
      <Box className="calendar-day__top-info">
        <Box marginBottom={1}>
          <Typography
            variant="h4"
            className={cn('MuiTypography calendar-day__date font-bold', {
              'calendar-day__date--active': CalendarDayClass.isToday(day.date),
            })}
          >
            <span>{formatDate(day.date, 'DD')}</span>
            <span>{CalendarMonthClass.getMonthNameByIndex(monthIndex).month}</span>
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
            <Icon icon="chevron-left" size={20} />
          </Button>
          <Button variant="text" onClick={nextDay} className="calendar-day__control-button">
            <Icon icon="chevron-right" size={20} />
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
              {dayHours.map((item, key) => (
                <ListItem key={key} className="calendar-day__cell"></ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
