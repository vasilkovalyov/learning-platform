import React, { useEffect, useState } from 'react'
import Typography from 'antd/lib/typography'
import cn from 'classnames'

import CalendarDate from './utilities/CalendarDate'
import CalendarMonth from './utilities/CalendarMonth'
import CalendarWeek from './utilities/CalendarWeek'
import CalendarDay from './utilities/CalendarDay'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Icon from 'components/Icon'

import { getCurrentTime } from './utilities/time'

import { useCalendar } from './hooks/useCalendar'

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
  const calendarMonthInst = new CalendarMonth()
  const dayInst = new CalendarDay()
  const calendarDateInst = new CalendarDate()
  const weeks = new CalendarWeek().getWeekDaysNames()

  const [
    todayDate,
    targetDate,
    days,
    selectedMonth,
    selectedYear,
    setTodayDate,
    setDays,
    nextWeek,
    prevWeek,
    nextDay,
    prevDay,
    nextMonth,
    prevMonth,
    getMonthByIndex,
    isWeekend,
  ] = useCalendar(calendarDateInst.createDate())

  const calendarViewClassnames = cn({
    'calendar-events--month-view': dateView === 'month',
    'calendar-events--week-view': dateView === 'week',
    'calendar-events--day-view': dateView === 'day',
  })

  function onHandleDateView(type: CalendarModeView) {
    setDateView(type)
  }

  useEffect(() => {
    if (dateView === 'month') {
      setDays(calendarMonthInst.getTotalDaysInViewMonth())
    } else {
      setDays(calendarMonthInst.getTotalDaysInView())
    }
  }, [dateView])

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
                <Button onClick={prevMonth} className="calendar-events__month-switcher-button">
                  <Icon icon="chevron-left" size={20} className="calendar-events__month-switcher-icon" />
                </Button>
              ) : null}
              <Paragraph className="calendar-events__month">
                <Space>
                  {dateView === 'day' ? calendarDateInst.formatDate(targetDate.date, 'DD') : null}
                  {getMonthByIndex(selectedMonth).month}
                  {selectedYear}
                </Space>
              </Paragraph>
              {dateView === 'month' ? (
                <Button onClick={nextMonth} className="calendar-events__month-switcher-button">
                  <Icon icon="chevron-right" size={20} className="calendar-events__month-switcher-icon" />
                </Button>
              ) : null}
            </Space>
          </Col>
        </Row>

        <Paragraph className="calendar-events__today-info">
          {todayDate.date === targetDate.date ? 'Today is' : null} {targetDate.day}
          <span> </span>
          {dateView !== 'day'
            ? calendarDateInst.formatDate(targetDate.date, 'DD MMMM YYYY')
            : getCurrentTime(new Date())}
        </Paragraph>
        {dateView === 'day' ? (
          <div className="calendar-events__controls-day">
            <Button onClick={prevDay} className="calendar-events__control-day-button">
              <Icon icon="chevron-left" size={20} className="calendar-events__control-day-icon" />
            </Button>
            <Button onClick={nextDay} className="calendar-events__control-day-button">
              <Icon icon="chevron-right" size={20} className="calendar-events__control-day-icon" />
            </Button>
          </div>
        ) : null}
      </div>

      {dateView === 'day' ? (
        <div className="calendar-day-view">
          <div className="calendar-day-view__left">
            <div className="calendar-day-hours">
              {dayInst.getDayHours(8, 22).map((item, key) => (
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
                  {dayInst.getDayHours(8, 22).map((item, key) => (
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

      {dateView === 'week' ? (
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
              {dayInst.getDayHours(8, 22).map((item, key) => (
                <div key={key} className="calendar-day-hours__item">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-week-view__right">
            <div className="calendar-week-view__body">
              <div className="calendar-week-days">
                {weeks.map((week, key) => (
                  <div key={key} className="calendar-week-days__item">
                    <div
                      className={cn('calendar-week-days__cell', {
                        active: todayDate.day === week.day && selectedMonth === todayDate.monthIndex,
                      })}
                    >
                      {week.day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="calendar-day-times calendar-day-times--week">
                {weeks.map((week, key) => (
                  <div key={key} className={cn('calendar-day-times__item', { weekend: isWeekend(week.day) })}>
                    {dayInst.getDayHours(8, 22).map((item, key) => (
                      <div key={key} className="calendar-day-times__cell"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {dateView === 'month' ? (
        <>
          <div className="calendar-week-days">
            {weeks.map((week, key) => (
              <div key={key} className="calendar-week-days__item">
                <div
                  className={cn('calendar-week-days__cell', {
                    active: todayDate.day === week.day && selectedMonth === todayDate.monthIndex,
                  })}
                >
                  {week.day}
                </div>
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((day, key) => (
              <div key={key} className="calendar-days__item">
                <div
                  className={cn(
                    'calendar-days__cell',
                    { today: dayInst.checkIsToday(day.date) },
                    { 'current-month': calendarMonthInst.isCurrentMonth(selectedYear, day.monthIndex) },
                    { 'another-month': day.monthIndex !== selectedMonth },
                    { weekend: isWeekend(day.day) },
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
