import React, { useState } from 'react'
import cn from 'classnames'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import Icon from 'components/Icon'
import Typography from 'antd/lib/typography'

import { IDay } from '../CalendarDay/CalendarDay.type'

import CalendarHours from '../CalendarHours/CalendarHours'

import CalendarEvents from '../CalendarEvents/CalendarEvents'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import CalendarWeekClass from './CalendarWeek.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'
import CalendarMonthClass from '../CalendarMonth/CalendarMonth.class'

import { ICalendarWeekProps } from './CalendarWeek.type'
import { formatDate } from '../../utilities/date'
import { weekDaysCount, calendarStartHourFrom, calendarStartHourTo } from '../../constants'
import { getFilteredEventByDate } from '../../utilities/custom'

const { Paragraph } = Typography

export default function CalendarWeek({ date, today = new Date(), events, locale = 'en-En' }: ICalendarWeekProps) {
  const todayDay = new CalendarDayClass({ date: today, locale }).getDay()
  const weekInst = new CalendarWeekClass()
  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)
  const weekNames = weekInst.getWeekNames()

  const [year, setYear] = useState<number>(date.getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [week, setWeek] = useState<IDay[]>(CalendarWeekClass.getWeekDayByDate(new Date()))
  const [day, setDay] = useState<IDay>(new CalendarDayClass({ date: date, locale }).getDay())

  function renderEvents(date: Date, events: ICalendarEvent[] = []) {
    const filteredEvents = getFilteredEventByDate(date, events)

    if (!filteredEvents.length) return null

    return <CalendarEvents events={filteredEvents} />
  }

  function togglerWeeks(weekDay: Date) {
    const prevWeekDays = CalendarWeekClass.getWeekDayByDate(weekDay)
    const fDayWeek = prevWeekDays[0]
    setDay(fDayWeek)
    setYear(fDayWeek.year)
    setMonthIndex(fDayWeek.monthIndex)
    setWeek(CalendarWeekClass.getWeekDayByDate(weekDay))
  }

  function prevWeek() {
    const prevWeekDay = new Date(year, monthIndex, day.date.getDate() - weekDaysCount)
    togglerWeeks(prevWeekDay)
  }

  function nextWeek() {
    const nextWeekDay = new Date(year, monthIndex, day.date.getDate() + weekDaysCount)
    togglerWeeks(nextWeekDay)
  }

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Paragraph className="calendar-events__month">
            <Space>
              {CalendarMonthClass.getMonthNameByIndex(day.monthIndex).month}
              {day.year}
            </Space>
          </Paragraph>
          <Paragraph className="calendar-events__today-info">
            {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
          </Paragraph>
        </Col>
      </Row>
      <Row className="calendar-week-view">
        <Col className="calendar-week-view__left">
          <Row className="calendar-week-view__controls">
            <Space size={8}>
              <Button onClick={prevWeek} className="calendar-week-view__switcher-button">
                <Icon icon="chevron-left" size={20} className="calendar-week-view__switcher-icon" />
              </Button>
              <Button onClick={nextWeek} className="calendar-week-view__switcher-button">
                <Icon icon="chevron-right" size={20} className="calendar-week-view__switcher-icon" />
              </Button>
            </Space>
          </Row>
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} />
        </Col>
        <Col className="calendar-week-view__right">
          <div className="calendar-week-days">
            {weekNames.map((weekName, key) => (
              <div key={key} className="calendar-week-days__item">
                <div
                  className={cn('calendar-week-days__cell', {
                    active: week[key].isToday,
                  })}
                >
                  <div>{weekName}</div>
                  <div>{week[key].dayNumber < 10 ? `0${week[key].dayNumber}` : week[key].dayNumber}</div>
                </div>
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
        </Col>
      </Row>
    </>
  )
}
