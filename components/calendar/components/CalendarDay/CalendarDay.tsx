import React, { useState } from 'react'
import cn from 'classnames'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import Button from 'antd/lib/button'
import Icon from 'components/Icon'

import CalendarEvent from '../CalendarEvent/CalendarEvent'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import CalendarMonthClass from '../CalendarMonth/CalendarMonth.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { IDay } from '../CalendarDay/CalendarDay.type'

import { ICalendarDayProps } from './CalendarDay.type'
import { getCurrentTime } from '../../utilities/time'
import { formatDate } from '../../utilities/date'

const { Paragraph } = Typography

export default function CalendarDay({ date, events = [], locale = 'en-En' }: ICalendarDayProps) {
  const dayHours = CalendarDayClass.getDayHours(8, 22)
  const currentHour = parseInt(getCurrentTime(new Date()).split(':')[0])

  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [year, setYear] = useState<number>(date.getFullYear())
  const [day, setDay] = useState<IDay>(new CalendarDayClass({ date: date, locale }).getDay())

  function renderEvents(date: Date, events: ICalendarEvent[] = []) {
    const cellHeight = 100
    const startHourWith = 8
    const filteredEvents = events.filter(
      (e) =>
        new Date(e.eventStart).getDate() === date.getDate() &&
        new Date(e.eventStart).getMonth() === date.getMonth() &&
        new Date(e.eventStart).getFullYear() === date.getFullYear(),
    )

    if (!filteredEvents.length) return null

    return filteredEvents.map((item) => {
      const dateStart = new Date(item.eventStart)
      const dateEnd = new Date(item.eventEnd)
      const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / 60
      const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / 60
      const topPosition = cellHeight * (hourStartWithTimeZone - startHourWith + dateStart.getMinutes() / 60)
      const height = (hourEndWithTimeZone - hourStartWithTimeZone + dateEnd.getMinutes() / 60) * cellHeight

      return (
        <CalendarEvent
          key={item.id}
          id={item.id}
          title={item.title}
          eventStart={`${dateStart.getHours()}:${dateStart.getMinutes()}`}
          eventEnd={`${dateEnd.getHours()}:${dateEnd.getMinutes()}`}
          type={item.type}
          styles={{
            top: topPosition,
            height: height,
          }}
        />
      )
    })
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
    const cellHeight = 100
    return (parseInt(hour) - 8) * cellHeight + (parseInt(minute) / 60) * 100
  }

  return (
    <>
      <div className="calendar-events__date-info">
        <Paragraph className={cn('calendar-events__month', { active: CalendarDayClass.isToday(day.date) })}>
          <Space>
            {formatDate(day.date, 'DD')}
            {CalendarMonthClass.getMonthNameByIndex(monthIndex).month}
            {year}
          </Space>
        </Paragraph>
        <Paragraph className="calendar-events__today-info">{`${day.day} ${getCurrentTime(new Date())}`}</Paragraph>
      </div>
      <div className="calendar-events__controls-day">
        <Button onClick={prevDay} className="calendar-events__control-day-button">
          <Icon icon="chevron-left" size={20} className="calendar-events__control-day-icon" />
        </Button>
        <Button onClick={nextDay} className="calendar-events__control-day-button">
          <Icon icon="chevron-right" size={20} className="calendar-events__control-day-icon" />
        </Button>
      </div>
      <div className="calendar-day-view">
        <div className="calendar-day-view__left">
          <div className="calendar-day-hours">
            {dayHours.map((item, key) => (
              <div key={key} className="calendar-day-hours__item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-day-view__right">
          <div className="calendar-day-view__body">
            <div className="calendar-day-times calendar-day-times--day">
              {currentHour < 8 || currentHour < 22 ? (
                <div className="calendar-day-times__timeline" style={{ top: getCurrentTimePosition() + 'px' }}></div>
              ) : null}
              <div className="calendar-day-times__item">
                {renderEvents(day.date, events)}
                {dayHours.map((item, key) => (
                  <div key={key} className="calendar-day-times__cell"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
