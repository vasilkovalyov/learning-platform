import React, { useState } from 'react'
import Typography from 'antd/lib/typography'
import cn from 'classnames'

import CalendarYear from './utilities/CalendarYear/CalendarYear'
import CalendarMonth from './utilities/CalendarMonth/CalendarMonth'
import CalendarWeek from './utilities/CalendarWeek/CalendarWeek'
import { ICalendarWeek } from './utilities/CalendarWeek/CalendarWeek.type'
import CalendarDay from './utilities/CalendarDay/CalendarDay'
import { IDay } from './utilities/CalendarDay/CalendarDay.type'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Icon from 'components/Icon'

import { getCurrentTime } from './utilities/time'
import { formatDate } from './utilities/date'

enum CalendarEventTypeColor {
  PERSONAL_LESSON = '#D1EAE7',
  GROUP_LESSON = '#FAEEDF',
  AVAILABLE_TIME = '#E9F4FF',
  UNAVAILABLE_TIME = '#F2F5FA',
}

interface ICalendarLessonsType {
  id: string
  type: string
  title: string
  color: CalendarEventTypeColor
}

interface ICalendarDateTypeView {
  id: string
  type: string
  title: string
}

type CalendarModeView = 'day' | 'week' | 'month'

const lessonsTypes: ICalendarLessonsType[] = [
  {
    id: '1',
    color: CalendarEventTypeColor.PERSONAL_LESSON,
    title: 'Personal lessons',
    type: 'personal_lesson',
  },
  {
    id: '2',
    color: CalendarEventTypeColor.GROUP_LESSON,
    title: 'Group lessons',
    type: 'group_lesson',
  },
  {
    id: '3',
    color: CalendarEventTypeColor.AVAILABLE_TIME,
    title: 'Available time',
    type: 'available_time',
  },
  {
    id: '4',
    color: CalendarEventTypeColor.UNAVAILABLE_TIME,
    title: 'Unavailable time',
    type: 'unavailable_time',
  },
]

const dateTypeViews: ICalendarDateTypeView[] = [
  {
    id: '1',
    title: 'Day',
    type: 'day',
  },
  {
    id: '2',
    title: 'Week',
    type: 'week',
  },
  {
    id: '3',
    title: 'Month',
    type: 'month',
  },
]

const { Paragraph, Text } = Typography

function Calendar() {
  const [dateView, setDateView] = useState<CalendarModeView>('month')
  const weekInst = new CalendarWeek()
  const dayInst = new CalendarDay()

  const today = dayInst.getDay()
  const todayYear = new CalendarYear({ year: today.year })
  const weeksNames = weekInst.getWeekNames()
  const dayHours = dayInst.getDayHours(8, 22)

  const [year, setYear] = useState<CalendarYear>(new CalendarYear({ year: today.year }))
  // const currentWeek = todayYear.getYearWeeks().filter((week) => week.isCurrent === true)[0]
  const [selectedMonth, setSelectedMonth] = useState<number>(today.monthIndex)
  const [days, setDays] = useState<CalendarMonth>(year.getYearMonthes()[selectedMonth])
  // const [weeks, setWeeks] = useState<ICalendarWeek>(year.getYearWeeks()[currentWeek.weekNumber - 1])
  // const [weekNumber, setWeekNumber] = useState<number>(currentWeek.weekNumber)
  const [selectedDay, setSelectedDay] = useState<IDay>(dayInst.getDay())

  const calendarViewClassnames = cn({
    'calendar-events--month-view': dateView === 'month',
    'calendar-events--week-view': dateView === 'week',
    'calendar-events--day-view': dateView === 'day',
  })

  function onHandleDateView(type: CalendarModeView) {
    if (dateView === 'month' && type === 'day' && today.monthIndex !== selectedMonth) {
      setSelectedDay(new CalendarDay({ date: new Date(year.year, selectedMonth, 1) }).getDay())
    }
    if (dateView === 'day' && type === 'month') {
      // setSelectedDay(today)
    }
    setDateView(type)
  }

  function prevMonth() {
    if (selectedMonth === 0) {
      const prevYear = new CalendarYear({ year: year.year - 1 })
      setYear(prevYear)
      setSelectedMonth(11)
      setDays(prevYear.getYearMonthes()[11])
      return
    }
    setSelectedMonth(selectedMonth - 1)
    setDays(year.getYearMonthes()[selectedMonth - 1])
  }

  function nextMonth() {
    if (selectedMonth > 10) {
      const newYear = new CalendarYear({ year: year.year + 1 })
      setYear(newYear)
      setSelectedMonth(0)
      setDays(newYear.getYearMonthes()[0])
      // setSelectedDay(new CalendarDay({ date: new Date(year.year + 1, 0, 1) }).getDay())
      return
    }
    setSelectedMonth(selectedMonth + 1)
    setDays(year.getYearMonthes()[selectedMonth + 1])
    // setSelectedDay(new CalendarDay({ date: new Date(year.year, selectedMonth + 1, 1) }).getDay())
  }

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

  function prevDay() {
    if (selectedDay.dayNumber <= 1) {
      if (selectedMonth === 0) {
        const prevYear = new CalendarYear({ year: year.year - 1 })
        const prevMonthDay = new CalendarDay({ date: new Date(year.year - 1, 12, 0) }).getDay()
        setYear(prevYear)
        setSelectedMonth(11)
        setSelectedDay(prevMonthDay)
      } else {
        const prevMonth = selectedMonth - 1
        const prevMonthDay = new CalendarDay({ date: new Date(year.year, selectedMonth, 0) }).getDay()
        setSelectedDay(prevMonthDay)
        setSelectedMonth(prevMonth)
      }
    } else {
      const prevDay = new CalendarDay({ date: new Date(year.year, selectedMonth, selectedDay.dayNumber - 1) }).getDay()
      setSelectedDay(prevDay)
    }
  }

  function nextDay() {
    if (selectedDay.dayNumber >= days.getMonthDays().length) {
      if (selectedMonth === 11) {
        const nextYear = new CalendarYear({ year: year.year + 1 })
        const nextMonthDay = new CalendarDay({ date: new Date(nextYear.year, 0, 1) }).getDay()
        setYear(nextYear)
        setSelectedMonth(0)
        setSelectedDay(nextMonthDay)
      } else {
        const nextMonthDay = new CalendarDay({ date: new Date(year.year, selectedMonth, 1) }).getDay()
        setSelectedMonth(selectedMonth + 1)
        setSelectedDay(nextMonthDay)
      }
    } else {
      const nextDay = new CalendarDay({ date: new Date(year.year, selectedMonth, selectedDay.dayNumber + 1) }).getDay()
      setSelectedDay(nextDay)
    }
  }

  return (
    <div className={cn('calendar-events', calendarViewClassnames)}>
      {dateTypeViews && dateTypeViews.length ? (
        <Row justify="end">
          <Col span={24} md={12}>
            <div className="calendar-events__date-view-list">
              {dateTypeViews.map((dateType) => (
                <Button
                  key={dateType.id}
                  className={cn('calendar-events__date-view', { active: dateView === dateType.type })}
                  onClick={() => onHandleDateView(dateType.type as CalendarModeView)}
                >
                  {dateType.title}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      ) : null}

      <div className="calendar-events__date-info">
        <Row justify="center">
          <Col span={24}>
            <Space size={[30, 30]} direction="horizontal" className="calendar-events__month-switcher">
              {dateView === 'month' ? (
                <Button onClick={() => prevMonth()} className="calendar-events__month-switcher-button">
                  <Icon icon="chevron-left" size={20} className="calendar-events__month-switcher-icon" />
                </Button>
              ) : null}
              <Paragraph className="calendar-events__month">
                <Space>
                  {dateView === 'day' ? formatDate(selectedDay.date, 'DD') : null}
                  {new CalendarMonth().getMonthNameByIndex(selectedMonth).month}
                  {year.year}
                </Space>
              </Paragraph>
              {dateView === 'month' ? (
                <Button onClick={() => nextMonth()} className="calendar-events__month-switcher-button">
                  <Icon icon="chevron-right" size={20} className="calendar-events__month-switcher-icon" />
                </Button>
              ) : null}
            </Space>
          </Col>
        </Row>

        <Paragraph className="calendar-events__today-info">
          {dateView === 'month' || dateView === 'week'
            ? `Today is ${today.day} ${formatDate(today.date, 'DD MMMM YYYY')}`
            : `${selectedDay.day} ${getCurrentTime(new Date())}`}
        </Paragraph>
        {dateView === 'day' ? (
          <div className="calendar-events__controls-day">
            <Button onClick={() => prevDay()} className="calendar-events__control-day-button">
              <Icon icon="chevron-left" size={20} className="calendar-events__control-day-icon" />
            </Button>
            <Button onClick={() => nextDay()} className="calendar-events__control-day-button">
              <Icon icon="chevron-right" size={20} className="calendar-events__control-day-icon" />
            </Button>
          </div>
        ) : null}
      </div>

      {dateView === 'day' ? (
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
                <div className="calendar-day-times__timeline"></div>
                <div className="calendar-day-times__item">
                  {dayHours.map((item, key) => (
                    <div key={key} className="calendar-day-times__cell">
                      {item.split(':')[0] === new Date().getHours().toString() ? (
                        <div
                          className="timeline"
                          style={{ top: (parseInt(getCurrentTime(new Date()).split(':')[1]) / 60) * 100 }}
                        ></div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* {dateView === 'week' ? (
        <div className="calendar-week-view">
          <div className="calendar-week-view__left">
            <div className="calendar-week-view__controls">
              <Button onClick={() => prevWeek()} className="calendar-week-view__switcher-button">
                <Icon icon="chevron-left" size={20} className="calendar-week-view__switcher-icon" />
              </Button>
              <Button onClick={() => nextWeek()} className="calendar-week-view__switcher-button">
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
                {weeksNames.map((week, key) => (
                  <div key={key} className="calendar-week-days__item">
                    <div
                      className={cn('calendar-week-days__cell', {
                        active: weeks.days[key].isToday,
                      })}
                    >
                      <div>{week}</div>
                      <div>
                        {weeks.days[key].dayNumber < 10 ? `0${weeks.days[key].dayNumber}` : weeks.days[key].dayNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="calendar-day-times calendar-day-times--week">
                {weeksNames.map((week, key) => (
                  <div
                    key={key}
                    className={cn('calendar-day-times__item', { weekend: week === 'Saturday' || week === 'Sunday' })}
                  >
                    {dayHours.map((item, key) => (
                      <div key={key} className="calendar-day-times__cell"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null} */}

      {dateView === 'month' ? (
        <>
          <div className="calendar-week-days">
            {weeksNames.map((week, key) => (
              <div key={key} className="calendar-week-days__item">
                <div
                  className={cn('calendar-week-days__cell', {
                    // active: selectedDay.day === week && selectedMonth === selectedDay.monthIndex,
                    active: selectedDay.dayNumberInWeek - 1 === key && selectedDay.day === week,
                  })}
                >
                  {week}
                </div>
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {days.getMonthDaysFullView().map((day, key) => (
              <div key={key} className="calendar-days__item">
                <div
                  className={cn(
                    'calendar-days__cell',
                    { today: day.isToday },
                    { 'current-month': day.isCurrentMonth },
                    { 'another-month': !day.isCurrentMonth },
                    { weekend: day.isWeekend },
                  )}
                >
                  {day.dayNumber}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {lessonsTypes && lessonsTypes.length ? (
        <Row className="calendar-events__event-types">
          {lessonsTypes.map((lessonType) => (
            <div key={lessonType.id} className="calendar-events__event-type">
              <div className="calendar-events__event-type-color" style={{ backgroundColor: lessonType.color }}></div>
              <Text className="calendar-events__event-type-heading">{lessonType.title}</Text>
            </div>
          ))}
        </Row>
      ) : null}
    </div>
  )
}

export default Calendar
