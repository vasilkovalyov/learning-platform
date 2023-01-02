import React, { useState } from 'react'
import cn from 'classnames'

import { ICalendar } from './calendar.type'
import { ICalendarEvent, CalendarEventType } from './components/CalendarEvent/CalendarEvent.type'
import { CalendarLessonTypeColor } from './components/CalendarEventsTypes/CalendarEventsTypes.type'

import CalendarMonthClass from './components/CalendarMonth/CalendarMonth.class'
import CalendarDayClass from './components/CalendarDay/CalendarDay.class'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import Typography from 'antd/lib/typography'

import CalendarHours from './components/CalendarHours/CalendarHours'
import CalendarEventsTypes from './components/CalendarEventsTypes/CalendarEventsTypes'

import Icon from 'components/Icon'

import { calendarStartHourFrom, calendarStartHourTo, lessonsCalendarCellHeight, hourMinutes } from './constants'

import { getFilteredEventByDate } from './utilities/custom'

import { lessonsTypes } from './components/CalendarEventsTypes/CalendarEventsTypes.data'

const { Text } = Typography

function LessonsCalendar({ date, events, locale = 'en-En' }: ICalendar) {
  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)

  const monthInst = new CalendarMonthClass({ date: date, locale: locale })

  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [monthName, setMonthName] = useState<string>(monthInst.monthName)
  const [year, setYear] = useState<number>(date.getFullYear())

  const [daysCountInMonth, setDaysCountInMonth] = useState<number>(
    CalendarMonthClass.getDaysCountInMonthByIndex(date.getFullYear(), date.getMonth()),
  )

  function renderEvents(date: Date, events: ICalendarEvent[] = []): ICalendarEvent[] | null {
    const filteredEvents = getFilteredEventByDate(date, events)

    if (!filteredEvents.length) return null

    return filteredEvents
  }

  function prevMonth() {
    if (monthIndex === 0) {
      const prevYear = year - 1
      const monthInst = new CalendarMonthClass({ date: new Date(prevYear, 11, 1), locale })
      setYear(prevYear)
      setMonthName(monthInst.monthName)
      setMonthIndex(11)
      setDaysCountInMonth(CalendarMonthClass.getDaysCountInMonthByIndex(prevYear, 12))
      return
    }
    const prevMonth = monthIndex - 1
    const monthInst = new CalendarMonthClass({ date: new Date(year, prevMonth, 1), locale })
    setMonthName(monthInst.monthName)
    setMonthIndex(prevMonth)
    setDaysCountInMonth(CalendarMonthClass.getDaysCountInMonthByIndex(year, prevMonth + 1))
  }

  function nextMonth() {
    if (monthIndex > 10) {
      const nextYear = year + 1
      const monthInst = new CalendarMonthClass({ date: new Date(nextYear, 0, 1), locale })
      setYear(nextYear)
      setMonthName(monthInst.monthName)
      setMonthIndex(0)
      setDaysCountInMonth(CalendarMonthClass.getDaysCountInMonthByIndex(nextYear, 1))
      return
    }
    const nextMonth = monthIndex + 1
    const monthInst = new CalendarMonthClass({ date: new Date(year, nextMonth, 1), locale })
    setMonthName(monthInst.monthName)
    setMonthIndex(nextMonth)
    setDaysCountInMonth(CalendarMonthClass.getDaysCountInMonthByIndex(year, nextMonth + 1))
  }
  const getColorByType = (type: CalendarEventType) => {
    switch (type) {
      case 'group': {
        return CalendarLessonTypeColor.GROUP_LESSON
      }
      case 'personal': {
        return CalendarLessonTypeColor.PERSONAL_LESSON
      }
      case 'course': {
        return CalendarLessonTypeColor.COURSE_LESSON
      }
      default: {
        return ''
      }
    }
  }

  return (
    <div className="lessons-calendar">
      <Row justify="center" className="lessons-calendar-month__controls">
        <Col className="d-flex d-flex-justify-center">
          <Space size={20} className="lessons-calendar__controls">
            <Button onClick={prevMonth} className="lessons-calendar__control-button">
              <Icon icon="chevron-left" size={20} />
            </Button>
            <Text className="lessons-calendar__month color-black font-bold">{monthName}</Text>
            <Button onClick={nextMonth} className="lessons-calendar__control-button">
              <Icon icon="chevron-right" size={20} />
            </Button>
          </Space>
        </Col>
      </Row>
      <Row className="lessons-calendar__body">
        <Col className="lessons-calendar__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} className="lessons-calendar-hours" />
        </Col>
        <Col className="lessons-calendar__body-right">
          <div className="lessons-calendar-month-days">
            {Array.from(Array(daysCountInMonth).keys()).map((dayNumber, key) => (
              <div key={key} className={cn('lessons-calendar-month-days__cell text-center font-bold color-black')}>
                {++dayNumber}
              </div>
            ))}
          </div>
          <div className="lessons-calendar-day-times">
            {Array.from(Array(daysCountInMonth).keys()).map((dayNumber, key) => (
              <div key={key} className="lessons-calendar-day-times__item">
                {renderEvents(new Date(year, monthIndex, dayNumber + 1), events)?.map((event) => {
                  const dateStart = new Date(event.eventStart)
                  const dateEnd = new Date(event.eventEnd)
                  const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / hourMinutes
                  const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / hourMinutes
                  const topPosition = (
                    lessonsCalendarCellHeight *
                    (hourStartWithTimeZone - calendarStartHourFrom + dateStart.getMinutes() / hourMinutes)
                  ).toFixed(2)
                  const height = (
                    (hourEndWithTimeZone - hourStartWithTimeZone + dateEnd.getMinutes() / hourMinutes) *
                    lessonsCalendarCellHeight
                  ).toFixed(2)
                  return (
                    <div
                      key={event.id}
                      className="lessons-calendar__event-cell"
                      style={{
                        position: 'absolute',
                        top: +lessonsCalendarCellHeight + +topPosition + 'px',
                        left: 0,
                        right: 0,
                        height: height + 'px',
                        backgroundColor: getColorByType(event.type),
                      }}
                    ></div>
                  )
                })}
                {dayHours.map((_, key) => (
                  <div key={key} className="lessons-calendar-day-times__cell"></div>
                ))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <CalendarEventsTypes items={lessonsTypes} />
    </div>
  )
}

export default LessonsCalendar
