import React, { useState, MouseEvent, useRef } from 'react'
import cn from 'classnames'

import { ICalendar } from './calendar.type'
import { IDay } from './components/CalendarDay/CalendarDay.type'
import { ICalendarEvent } from './components/CalendarEvent/CalendarEvent.type'

import CalendarWeekClass from './components/CalendarWeek/CalendarWeek.class'
import CalendarDayClass from './components/CalendarDay/CalendarDay.class'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import CalendarHours from './components/CalendarHours/CalendarHours'
import Typography from 'antd/lib/typography'

import Icon from 'components/Icon'
import LessonScheduleCard from '../LessonScheduleCard/LessonScheduleCard'
import { ILessonScheduleCardProps } from '../LessonScheduleCard/LessonScheduleCard.type'

import { getCurrentTime } from './utilities/time'
import { formatDate } from './utilities/date'
import {
  calendarStartHourFrom,
  calendarStartHourTo,
  scheduleCalendarCellHeight,
  hourMinutes,
  weekDaysCount,
} from './constants'

import { getFilteredEventByDate } from './utilities/custom'

const { Title, Text } = Typography

function ScheduleCalendar({ date, events, locale = 'en-En' }: ICalendar) {
  const dayTimesRef = useRef<HTMLDivElement | null>(null)
  const lessonScheduleCardContainerRef = useRef<HTMLDivElement | null>(null)

  const [lessonScheduleCardPosition, setLessonScheduleCardPosition] = useState<object>({ top: 0, left: 0 })
  const [selectedLessonSchedule, setSelectedLessonSchedule] = useState<Omit<
    ILessonScheduleCardProps,
    'onClick'
  > | null>(null)

  const weekNames = new CalendarWeekClass().getWeekNames()
  const dayHours = CalendarDayClass.getDayHours(calendarStartHourFrom, calendarStartHourTo)

  const [week, setWeek] = useState<IDay[]>(CalendarWeekClass.getWeekDayByDate(new Date()))
  const [year, setYear] = useState<number>(date.getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [day, setDay] = useState<IDay>(new CalendarDayClass({ date: date, locale }).getDay())

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

  function renderEvents(date: Date, events: ICalendarEvent[] = []): ICalendarEvent[] | null {
    const filteredEvents = getFilteredEventByDate(date, events)

    if (!filteredEvents.length) return null

    return filteredEvents
  }

  function onClickEvent(e: MouseEvent<HTMLElement>, event: ICalendarEvent) {
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

    setLessonScheduleCardPosition({ top: positionTop, left: positionLeft })

    setSelectedLessonSchedule({
      id,
      dateStart: event.eventStart,
      dateEnd: event.eventEnd,
      price,
    })
  }

  function onClickSelectedLesson(id: string) {
    console.log('lesson id = ', id)
  }

  return (
    <div className="schedule-calendar">
      <Title level={2} className="schedule-calendar__heading font-bold color-black">
        Schedule
      </Title>
      <Row className="calendar-week__controls">
        <Col span={24} md={4}>
          <Space className="schedule-calendar__current-time">
            <Icon icon="clock-circular-outline" size={15} />
            <Text className="schedule-calendar__current-time-text font-semibold">{getCurrentTime(new Date())}</Text>
          </Space>
        </Col>
        <Col span={24} md={16} className="d-flex d-flex-justify-center">
          <Space size={8} className="schedule-calendar__controls">
            <Button onClick={prevWeek} className="schedule-calendar__control-button">
              <Icon icon="chevron-left" size={20} />
            </Button>
            <Space size={20} className="schedule-calendar__week-dates">
              <Text className="font-bold color-black">{formatDate(week[0].date, 'DD MMMM YYYY')}</Text>
              <Text>-</Text>
              <Text className="font-bold color-black">{formatDate(week[weekDaysCount - 1].date, 'DD MMMM YYYY')}</Text>
            </Space>
            <Button onClick={nextWeek} className="schedule-calendar__control-button">
              <Icon icon="chevron-right" size={20} />
            </Button>
          </Space>
        </Col>
        <Col span={24} md={4}></Col>
      </Row>
      <Row className="schedule-calendar__body">
        <Col className="schedule-calendar__body-left">
          <CalendarHours from={calendarStartHourFrom} to={calendarStartHourTo} className="schedule-calendar-hours" />
        </Col>
        <Col className="schedule-calendar__body-right">
          <div className="schedule-calendar-week-days">
            {weekNames.map((weekName, key) => (
              <div
                key={key}
                className={cn('schedule-calendar-week-days__cell text-center font-bold color-black', {
                  active: week[key].isToday,
                })}
              >
                <Space size={6}>
                  {weekName}
                  {week[key].dayNumber < 10 ? `0${week[key].dayNumber}` : week[key].dayNumber}
                </Space>
              </div>
            ))}
          </div>
          <div ref={dayTimesRef} className="schedule-calendar-day-times">
            {weekNames.map((weekName, key) => (
              <div
                key={key}
                className={cn('schedule-calendar-day-times__item', {
                  weekend: weekName === 'Saturday' || weekName === 'Sunday',
                })}
              >
                {renderEvents(week[key].date, events)?.map((event) => {
                  const dateStart = new Date(event.eventStart)
                  const dateEnd = new Date(event.eventEnd)
                  const hourStartWithTimeZone = dateStart.getHours() + new Date().getTimezoneOffset() / hourMinutes
                  const hourEndWithTimeZone = dateEnd.getHours() + new Date().getTimezoneOffset() / hourMinutes
                  const topPosition =
                    scheduleCalendarCellHeight *
                    (hourStartWithTimeZone - calendarStartHourFrom + dateStart.getMinutes() / hourMinutes)
                  const height =
                    (hourEndWithTimeZone - hourStartWithTimeZone + dateEnd.getMinutes() / hourMinutes) *
                      scheduleCalendarCellHeight -
                    (dateEnd.getMinutes() / hourMinutes) * scheduleCalendarCellHeight
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
              </div>
            ))}
          </div>
          <div
            ref={lessonScheduleCardContainerRef}
            className={cn('lesson-schedule-card-position-container', {
              'lesson-schedule-card-position-container--show': selectedLessonSchedule !== null,
            })}
            style={lessonScheduleCardPosition}
            onMouseLeave={() => {
              setSelectedLessonSchedule(null)
              setLessonScheduleCardPosition({
                top: 0,
                left: 0,
              })
            }}
          >
            {selectedLessonSchedule ? (
              <LessonScheduleCard {...selectedLessonSchedule} onClick={(id) => onClickSelectedLesson(id)} />
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ScheduleCalendar
