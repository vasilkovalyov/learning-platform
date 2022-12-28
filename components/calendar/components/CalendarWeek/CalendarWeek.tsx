import React from 'react'
import cn from 'classnames'

import Button from 'antd/lib/button'
import Icon from 'components/Icon'
import Typography from 'antd/lib/typography'

import CalendarWeekClass from './CalendarWeek.class'
import CalendarDayClass from '../CalendarDay/CalendarDay.class'

import { ICalendarWeekProps } from './CalendarWeek.type'
import { getCurrentTime } from '../../utilities/time'
import { formatDate } from '../../utilities/date'

const { Paragraph, Text } = Typography

export default function CalendarWeek({ events, locale = 'en-En' }: ICalendarWeekProps) {
  const weekInst = new CalendarWeekClass()
  const dayHours = CalendarDayClass.getDayHours(8, 22)
  const weekNames = weekInst.getWeekNames()

  // function renderEventsForDay(date: Date, events: ICalendarEvent[]) {
  //   const cellHeight = 100
  //   const startHourWith = 8
  //   const filteredEvents = events.filter((e) => e.duration.from.getDate() === date.getDate())

  //   if (!filteredEvents.length) return null

  //   return filteredEvents.map((item) => {
  //     const dateFrom = item.duration.from
  //     const dateTo = item.duration.to
  //     const topPosition = cellHeight * (dateFrom.getHours() - startHourWith + dateFrom.getMinutes() / 60)
  //     const height = (dateTo.getHours() - dateFrom.getHours() + dateTo.getMinutes() / 60) * cellHeight

  //     return (
  //       <CalendarEvent
  //         key={item.id}
  //         id={item.id}
  //         title={item.title}
  //         dateFrom={dateFrom}
  //         dateTo={dateTo}
  //         type={item.type}
  //         styles={{
  //           top: topPosition,
  //           height: height,
  //         }}
  //       />
  //     )
  //   })
  // }

  // function prevWeek() {
  //   if (weekNumber > 1) {
  //     const weekNum = weekNumber - 1
  //     const fDay = year.getYearWeeks()[weekNum - 1].days[0]
  //     setSelectedMonth(fDay.monthIndex)
  //     setWeekNumber(weekNumber - 1)
  //     setWeeks(year.getYearWeeks()[weekNum - 1])
  //     setSelectedDay(fDay)
  //     return
  //   }
  //   const prevYear = new CalendarYear({ year: year.year - 1 })
  //   const prevYearTotalWeeksCount = prevYear.getWeeksTotalCount()
  //   const fDay = year.getYearWeeks()[prevYearTotalWeeksCount - 1].days[0]
  //   setYear(prevYear)
  //   setSelectedMonth(11)
  //   setWeekNumber(prevYearTotalWeeksCount)
  //   setWeeks(prevYear.getYearWeeks()[prevYearTotalWeeksCount - 1])
  //   setSelectedDay(fDay)
  // }

  // function nextWeek() {
  //   if (weekNumber < year.getWeeksTotalCount()) {
  //     const weekNum = weekNumber - 1
  //     const fDay = year.getYearWeeks()[weekNum + 1].days[0]
  //     setSelectedMonth(fDay.monthIndex)
  //     setWeekNumber(weekNumber + 1)
  //     setWeeks(year.getYearWeeks()[weekNum + 1])
  //     setSelectedDay(fDay)
  //     return
  //   }
  //   const nextYear = new CalendarYear({ year: year.year + 1 })
  //   const nextYearTotalWeeksCount = nextYear.getWeeksTotalCount()
  //   const fDay = year.getYearWeeks()[nextYearTotalWeeksCount - 1].days[0]
  //   setYear(nextYear)
  //   setSelectedMonth(0)
  //   setWeekNumber(2)
  //   setWeeks(nextYear.getYearWeeks()[1])
  //   setSelectedDay(fDay)
  // }

  return (
    <div className="calendar-week-view">
      <div className="calendar-events__date-info">
        <Paragraph className="calendar-events__today-info">
          {/* {dateView === 'month' || dateView === 'week'
            ? `Today is ${today.day} ${formatDate(today.date, 'DD MMMM YYYY')}`
            : `${selectedDay.day} ${getCurrentTime(new Date())}`} */}
          Today is Wednesday 28 December 2022
        </Paragraph>
      </div>
      <div className="calendar-week-view__left">
        <div className="calendar-week-view__controls">
          <Button className="calendar-week-view__switcher-button">
            <Icon icon="chevron-left" size={20} className="calendar-week-view__switcher-icon" />
          </Button>
          <Button className="calendar-week-view__switcher-button">
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
            {weekNames.map((week, key) => (
              <div key={key} className="calendar-week-days__item">
                <div
                  className={cn('calendar-week-days__cell', {
                    // active: weeks.days[key].isToday,
                  })}
                >
                  <div>{week}</div>
                  <div>
                    {/* {weeks.days[key].dayNumber < 10 ? `0${weeks.days[key].dayNumber}` : weeks.days[key].dayNumber} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="calendar-day-times calendar-day-times--week">
            {weekNames.map((week, key) => (
              <div
                key={key}
                className={cn('calendar-day-times__item', { weekend: week === 'Saturday' || week === 'Sunday' })}
              >
                {/* {renderEventsForDay(weeks.days[key].date, events)} */}
                {dayHours.map((item, key) => (
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
