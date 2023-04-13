import React, { MouseEvent, useRef } from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { CalendarScheduleWeekProps } from './calendar-schedule-week.type'
import { CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import CalendarHours from '../CalendarHours'

import Icon from '../../../../components/Generic/Icon'

import { formatDate } from '../../utilities/date'
import {
  calendarStartHourFrom,
  calendarStartHourTo,
  scheduleCalendarCellHeight,
  hourMinutes,
  weekDaysCount,
  localeDefault,
} from '../../constants'

import { getFilteredEventByDate } from '../../utilities/custom'

import { useCalendarScheduleWeek } from './useCalendarScheduleWeek'

function ScheduleCalendar({
  date = new Date(),
  events,
  locale = localeDefault,
  children,
  selectedProps,
  positionComponent,
}: CalendarScheduleWeekProps) {
  const dayTimesRef = useRef<HTMLDivElement | null>(null)

  const { week, weekNames, nextWeek, prevWeek } = useCalendarScheduleWeek(date, locale)

  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)

  function renderEvents(date: Date, events: CalendarEventType[] = []): CalendarEventType[] | null {
    const filteredEvents = getFilteredEventByDate(date, events)

    if (!filteredEvents.length) return null
    return filteredEvents
  }

  function onClickEvent(e: MouseEvent<HTMLElement>, event: CalendarEventType) {
    const additionalSpaceForPositionLeft = 20

    const id = event.id
    const price = 10
    const positionTop = e.currentTarget.offsetTop
    const positionLeft =
      dayTimesRef.current && e.currentTarget.parentElement
        ? e.currentTarget.parentElement?.getBoundingClientRect().left -
          dayTimesRef.current?.getBoundingClientRect().left +
          e.currentTarget.offsetWidth -
          additionalSpaceForPositionLeft
        : 0

    positionComponent && positionComponent({ top: positionTop, left: positionLeft })
    selectedProps &&
      selectedProps({
        id: id,
        eventEnd: event.eventEnd,
        eventStart: event.eventStart,
        price: price,
      })
  }

  return (
    <Box className="schedule-calendar">
      <Box marginBottom={2}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          className="schedule-calendar__controls"
        >
          <Button variant="text" onClick={prevWeek} className="schedule-calendar__control-button">
            <Icon icon="chevron-left" size={20} />
          </Button>
          <Stack direction="row" spacing={2} className="schedule-calendar__week-dates">
            <span className="font-bold color-black">{formatDate(week[0].date, 'DD MMMM YYYY')}</span>
            <span>-</span>
            <span className="font-bold color-black">{formatDate(week[weekDaysCount - 1].date, 'DD MMMM YYYY')}</span>
          </Stack>
          <Button variant="text" onClick={nextWeek} className="schedule-calendar__control-button">
            <Icon icon="chevron-right" size={20} />
          </Button>
        </Stack>
      </Box>
      <Box className="schedule-calendar__body">
        <Box className="schedule-calendar__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} className="schedule-calendar-hours" />
        </Box>
        <Box className="schedule-calendar__body-right">
          <Box className="schedule-calendar-week-days">
            {weekNames.map((weekName, key) => (
              <Box
                key={key}
                className={cn('schedule-calendar-week-days__cell text-center font-bold color-black', {
                  active: week[key].isToday,
                })}
              >
                <Stack direction="row" spacing={1}>
                  <span>{week[key].dayNumber < 10 ? `0${week[key].dayNumber}` : week[key].dayNumber}</span>
                  <span>{weekName}</span>
                </Stack>
              </Box>
            ))}
          </Box>
          <Box ref={dayTimesRef} className="schedule-calendar-day-times">
            {weekNames.map((weekName, key) => (
              <Box
                key={key}
                className={cn('schedule-calendar-day-times__item', {
                  weekend: weekName === 'Saturday' || weekName === 'Sunday',
                })}
              >
                {renderEvents(week[key].date, events)?.map((event) => {
                  const dateStart = new Date(event.eventStart)
                  const dateEnd = new Date(event.eventEnd)
                  const hourStart = dateStart.getHours()
                  const hourEnd = dateEnd.getHours()

                  const topPosition =
                    scheduleCalendarCellHeight *
                    (hourStart - calendarStartHourFrom + dateStart.getMinutes() / hourMinutes)

                  const startMin = hourStart * hourMinutes + dateStart.getMinutes()
                  const endMin = hourEnd * hourMinutes + dateEnd.getMinutes()
                  const height = ((endMin - startMin) / hourMinutes) * scheduleCalendarCellHeight

                  return (
                    <button
                      key={event.id}
                      className="schedule-calendar__event-cell"
                      onMouseEnter={(e) => onClickEvent(e, event)}
                      style={{
                        position: 'absolute',
                        top: topPosition,
                        left: 0,
                        right: 0,
                        height: height,
                        backgroundColor: '#E1EEFC',
                      }}
                    ></button>
                  )
                })}
                {dayHours.map((_, key) => (
                  <div key={key} className="schedule-calendar-day-times__cell"></div>
                ))}
              </Box>
            ))}
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default ScheduleCalendar
