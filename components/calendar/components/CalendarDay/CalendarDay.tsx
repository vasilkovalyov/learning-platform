import React, { useState } from 'react'
import cn from 'classnames'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import List from 'antd/lib/list'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import Button from 'antd/lib/button'
import Icon from 'components/Icon'

import CalendarHours from '../CalendarHours/CalendarHours'
import CalendarEvents from '../CalendarEvents/CalendarEvents'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import CalendarMonthClass from '../CalendarMonth/CalendarMonth.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { IDay } from '../CalendarDay/CalendarDay.type'

import { ICalendarDayProps } from './CalendarDay.type'
import { getCurrentTime } from '../../utilities/time'
import { formatDate } from '../../utilities/date'
import { getFilteredEventByDate } from '../../utilities/custom'
import { calendarStartHourFrom, calendarStartHourTo, calendarCellHeight } from '../../constants'

const { Paragraph } = Typography

export default function CalendarDay({ date, events = [], locale = 'en-En' }: ICalendarDayProps) {
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
    <div className="calendar-day">
      <div className="calendar-day__top-info">
        <Paragraph
          className={cn('calendar-day__date font-bold color-black', {
            'calendar-day__date--active': CalendarDayClass.isToday(day.date),
          })}
        >
          <Space>
            {formatDate(day.date, 'DD')}
            {CalendarMonthClass.getMonthNameByIndex(monthIndex).month}
            {year}
          </Space>
        </Paragraph>
        <Paragraph className="calendar-day__today-info font-semibold color-grey">
          {`${day.day} ${getCurrentTime(new Date())}`}
        </Paragraph>
        <Row className="calendar-day__controls">
          <Space size={8}>
            <Button onClick={prevDay} className="calendar-day__control-button">
              <Icon icon="chevron-left" size={20} />
            </Button>
            <Button onClick={nextDay} className="calendar-day__control-button">
              <Icon icon="chevron-right" size={20} />
            </Button>
          </Space>
        </Row>
      </div>
      <Row className="calendar-day__body">
        <Col className="calendar-day__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} />
        </Col>
        <Col className="calendar-day__body-right">
          <div className="calendar-day-times calendar-day-times--day">
            {currentHour < calendarStartHourFrom || currentHour < calendarStartHourTo ? (
              <div className="calendar-day-times__timeline" style={{ top: getCurrentTimePosition() + 'px' }}></div>
            ) : null}
            {renderEvents(day.date, events)}
            <List className="calendar-day__cell-list">
              {dayHours.map((item, key) => (
                <List.Item key={key} className="calendar-day__cell"></List.Item>
              ))}
            </List>
          </div>
        </Col>
      </Row>
    </div>
  )
}
