import React, { useState } from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Icon from '../../../Generic/Icon'

import CalendarEvent from '../CalendarEvent'
import { ICalendarEvent, CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

import CalendarMonthClass from './CalendarMonth.class'
import CalendarWeekClass from '../CalendarWeek/CalendarWeek.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { ICalendarMonthProps } from './CalendarMonth.type'
import { IDay } from '../CalendarDay/CalendarDay.type'
import { formatDate } from '../../utilities/date'

export default function CalendarMonth({
  date = new Date(),
  events,
  today = new Date(),
  locale = 'en-En',
}: ICalendarMonthProps) {
  const todayDay = new CalendarDayClass({ date: today, locale }).getDay()
  const weekInst = new CalendarWeekClass({ locale: locale })
  const monthInst = new CalendarMonthClass({ date: date, locale: locale })

  const [monthDays, setMonthDays] = useState<IDay[]>(monthInst.getMonthDaysFullView())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [monthName, setMonthName] = useState<string>(monthInst.monthName)
  const [year, setYear] = useState<number>(date.getFullYear())

  function renderEvents(date: Date, events: ICalendarEvent[] = []) {
    const filteredEvents = events.filter(
      (e) =>
        new Date(e.eventStart).getFullYear() === date.getFullYear() &&
        new Date(e.eventStart).getMonth() === date.getMonth() &&
        new Date(e.eventStart).getDate() === date.getDate(),
    )

    if (!filteredEvents.length) return null

    const uniqEvents = { personal: 0, group: 0, course: 0 }
    filteredEvents.forEach((event: ICalendarEvent) => (uniqEvents[event.type] += 1))
    return Object.entries(uniqEvents).map((item, index) => {
      const [key, count] = item
      if (!count) return null
      const lessons = (lessonCount: number) => `${item[1]} ${lessonCount === 1 ? 'lesson' : 'lessons'}`
      return (
        <CalendarEvent key={index} id={key} title={lessons(count)} type={key as CalendarEventType} isCompact={true} />
      )
    })
  }

  function prevMonth() {
    if (monthIndex === 0) {
      const prevYear = year - 1
      const monthInst = new CalendarMonthClass({ date: new Date(prevYear, 11, 1), locale })
      setYear(prevYear)
      setMonthName(monthInst.monthName)
      setMonthIndex(11)
      setMonthDays(monthInst.getMonthDaysFullView())
      return
    }
    const prevMonth = monthIndex - 1
    const monthInst = new CalendarMonthClass({ date: new Date(year, prevMonth, 1), locale })
    setMonthName(monthInst.monthName)
    setMonthIndex(prevMonth)
    setMonthDays(monthInst.getMonthDaysFullView())
  }

  function nextMonth() {
    if (monthIndex > 10) {
      const nextYear = year + 1
      const monthInst = new CalendarMonthClass({ date: new Date(nextYear, 0, 1), locale })
      setYear(nextYear)
      setMonthName(monthInst.monthName)
      setMonthIndex(0)
      setMonthDays(monthInst.getMonthDaysFullView())
      return
    }
    const nextMonth = monthIndex + 1
    const monthInst = new CalendarMonthClass({ date: new Date(year, nextMonth, 1), locale })
    setMonthName(monthInst.monthName)
    setMonthIndex(nextMonth)
    setMonthDays(monthInst.getMonthDaysFullView())
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
        {weekInst.getWeekNames().map((week, key) => (
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
