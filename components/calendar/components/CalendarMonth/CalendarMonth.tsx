import React, { useState } from 'react'
import cn from 'classnames'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Icon from 'components/Icon'
import Typography from 'antd/lib/typography'

import CalendarEvent from '../CalendarEvent/CalendarEvent'
import { ICalendarEvent, CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

import CalendarMonthClass from './CalendarMonth.class'
import CalendarWeekClass from '../CalendarWeek/CalendarWeek.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { ICalendarMonthProps } from './CalendarMonth.type'
import { IDay } from '../CalendarDay/CalendarDay.type'
import { formatDate } from '../../utilities/date'

const { Paragraph } = Typography

export default function CalendarMonth({ date, events, today = new Date(), locale = 'en-En' }: ICalendarMonthProps) {
  const todayDay = new CalendarDayClass({ date: today, locale }).getDay()
  const weekInst = new CalendarWeekClass()
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

    const uniqEvents = { personal: 0, group: 0 }
    filteredEvents.forEach((event) => (uniqEvents[event.type] += 1))
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
    <div className="calendar-month">
      <Row className="calendar-month__controls" justify="center">
        <Col span={18} className="d-flex d-flex-justify-center">
          <Space size={[30, 30]} direction="horizontal">
            <Button onClick={prevMonth} className="calendar-month__control-button">
              <Icon icon="chevron-left" size={20} />
            </Button>
            <Paragraph className="calendar-month__month font-bold color-black">
              <Space>
                {monthName}
                {year}
              </Space>
            </Paragraph>
            <Button onClick={nextMonth} className="calendar-month__control-button">
              <Icon icon="chevron-right" size={20} />
            </Button>
          </Space>
        </Col>
      </Row>
      <Paragraph className="calendar-month__today-info text-center font-semibold color-grey">
        {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
      </Paragraph>
      <div className="calendar-week-days">
        {weekInst.getWeekNames().map((week, key) => (
          <div
            key={key}
            className={cn('calendar-week-days__cell ', {
              active: todayDay.day === week && todayDay.monthIndex === monthIndex && todayDay.year === year,
            })}
          >
            {week}
          </div>
        ))}
      </div>
      <div className="calendar-month__days">
        {monthDays.map((day, key) => (
          <div
            key={key}
            className={cn(
              'calendar-month__day-cell font-semibold',
              { 'calendar-month__day-cell--today': day.isToday && todayDay.monthIndex === monthIndex },
              { 'calendar-month__day-cell--current-month': day.isCurrentMonth },
              { 'calendar-month__day-cell--another-month': !day.isCurrentMonth },
              { 'calendar-month__day-cell--weekend': day.isWeekend },
            )}
          >
            <span className="calendar-month__day-cell-day-number">{day.dayNumber}</span>
            <div className="calendar-month__day-cell-events">{renderEvents(day.date, events)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
