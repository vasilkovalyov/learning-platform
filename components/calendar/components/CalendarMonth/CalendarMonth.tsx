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
      const lessons = (lessonCount: number) => {
        return `${item[1]} ${lessonCount === 1 ? 'lesson' : 'lessons'}`
      }
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
    <div>
      <Row justify="center">
        <Col span={24}>
          <Space size={[30, 30]} direction="horizontal" className="calendar-events__month-switcher">
            <Button onClick={prevMonth} className="calendar-events__month-switcher-button">
              <Icon icon="chevron-left" size={20} className="calendar-events__month-switcher-icon" />
            </Button>
            <Paragraph className="calendar-events__month">
              <Space>
                {monthName}
                {year}
              </Space>
            </Paragraph>
            <Button onClick={nextMonth} className="calendar-events__month-switcher-button">
              <Icon icon="chevron-right" size={20} className="calendar-events__month-switcher-icon" />
            </Button>
          </Space>
        </Col>
      </Row>
      <div className="calendar-events__date-info">
        <Paragraph className="calendar-events__today-info">
          {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
        </Paragraph>
      </div>
      <div className="calendar-week-days">
        {weekInst.getWeekNames().map((week, key) => (
          <div key={key} className="calendar-week-days__item">
            <div
              className={cn('calendar-week-days__cell', {
                active: todayDay.day === week && todayDay.monthIndex === monthIndex && todayDay.year === year,
              })}
            >
              {week}
            </div>
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {monthDays.map((day, key) => (
          <div key={key} className="calendar-days__item">
            <div
              className={cn(
                'calendar-days__cell',
                { today: day.isToday && todayDay.monthIndex === monthIndex },
                { 'current-month': day.isCurrentMonth },
                { 'another-month': !day.isCurrentMonth },
                { weekend: day.isWeekend },
              )}
            >
              <span className="calendar-days__cell-day-number">{day.dayNumber}</span>
              <div className="calendar-days__cell-events">{renderEvents(day.date, events)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
