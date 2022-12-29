import React, { useState } from 'react'
import cn from 'classnames'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import Icon from 'components/Icon'
import Typography from 'antd/lib/typography'

import { IDay } from '../CalendarDay/CalendarDay.type'

import CalendarEvent from '../CalendarEvent/CalendarEvent'
import { ICalendarEvent } from '../CalendarEvent/CalendarEvent.type'

import CalendarWeekClass from './CalendarWeek.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'
import CalendarMonthClass from '../CalendarMonth/CalendarMonth.class'

import { ICalendarWeekProps } from './CalendarWeek.type'
import { formatDate } from '../../utilities/date'
import { weekDaysCount } from '../../constants'

const { Paragraph } = Typography

export default function CalendarWeek({ date, today = new Date(), events, locale = 'en-En' }: ICalendarWeekProps) {
  const todayDay = new CalendarDayClass({ date: today, locale }).getDay()
  const weekInst = new CalendarWeekClass()
  const dayHours = CalendarDayClass.getDayHours(8, 22)
  const weekNames = weekInst.getWeekNames()

  const [year, setYear] = useState<number>(date.getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [week, setWeek] = useState<IDay[]>(CalendarWeekClass.getWeekDayByDate(new Date()))
  const [day, setDay] = useState<IDay>(new CalendarDayClass({ date: date, locale }).getDay())

  function renderEvents(date: Date, events: ICalendarEvent[] = []) {
    const cellHeight = 100
    const startHourWith = 8
    const filteredEvents = events.filter(
      (e) =>
        new Date(e.eventStart).getDate() === date.getDate() && new Date(e.eventStart).getMonth() === date.getMonth(),
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
          <Space size={[30, 30]} direction="horizontal" className="calendar-events__month-switcher">
            <Paragraph className="calendar-events__month">
              <Space>
                {CalendarMonthClass.getMonthNameByIndex(day.monthIndex).month}
                {day.year}
              </Space>
            </Paragraph>
          </Space>
        </Col>
      </Row>
      <div className="calendar-events__date-info">
        <Paragraph className="calendar-events__today-info">
          {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
        </Paragraph>
      </div>
      <div className="calendar-week-view">
        <div className="calendar-week-view__left">
          <div className="calendar-week-view__controls">
            <Button onClick={prevWeek} className="calendar-week-view__switcher-button">
              <Icon icon="chevron-left" size={20} className="calendar-week-view__switcher-icon" />
            </Button>
            <Button onClick={nextWeek} className="calendar-week-view__switcher-button">
              <Icon icon="chevron-right" size={20} className="calendar-week-view__switcher-icon" />
            </Button>
          </div>
          <div className="calendar-day-hours">
            {dayHours.map((item, key) => (
              <div key={key} className="calendar-day-hours__item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-week-view__right">
          <div className="calendar-week-view__body">
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
                  {dayHours.map((item, key) => (
                    <div key={key} className="calendar-day-times__cell"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
