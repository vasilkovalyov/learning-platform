import React, { useState } from 'react'
import cn from 'classnames'

import Icon from 'components/Icon'

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
    <div className="calendar-week">
      <div className="calendar-week__top-info">
        <div>
          <div>
            <div className="calendar-week__date font-bold color-black">
              <div>
                {CalendarMonthClass.getMonthNameByIndex(day.monthIndex).month}
                {day.year}
              </div>
            </div>
            <div className="calendar-week__today-info font-semibold color-grey">
              {`Today is ${todayDay.day} ${formatDate(todayDay.date, 'DD MMMM YYYY')}`}
            </div>
            <div className="calendar-week__controls">
              <div>
                <button onClick={prevWeek} className="calendar-week__control-button">
                  <Icon icon="chevron-left" size={20} />
                </button>
                <button onClick={nextWeek} className="calendar-week__control-button">
                  <Icon icon="chevron-right" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="calendar-week__body">
        <div className="calendar-week__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} />
        </div>
        <div className="calendar-week__body-right">
          <div className="calendar-week-days">
            {weekNames.map((weekName, key) => (
              <div
                key={key}
                className={cn('calendar-week-days__cell', {
                  active: week[key].isToday,
                })}
              >
                <div>{weekName}</div>
                <div>{week[key].dayNumber < 10 ? `0${week[key].dayNumber}` : week[key].dayNumber}</div>
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
        </div>
      </div>
    </div>
  )
}
