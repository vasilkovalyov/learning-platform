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
  const currentDate = calendarDateInst.createDate()

  const [days, selectedMonth, selectedYear, setDays, nextMonth, prevMonth, getMonthByIndex, isWeekend] =
    useCalendar(currentDate)

  function onHandleDateView(type: CalendarModeView) {
    setDateView(type)
  }

  useEffect(() => {
    setDays(calendarMonthInst.getTotalDaysInView())
  }, [])

  return (
    <div className="calendar-events">
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

      <Row justify="center">
        <Col span={24} md={12}>
          <Space size={[30, 30]} direction="horizontal" className="calendar-events__month-switcher">
            <Button onClick={prevMonth} className="calendar-events__month-switcher-button">
              <Icon icon="chevron-left" size={20} className="calendar-events__month-switcher-icon" />
            </Button>
            <Paragraph className="calendar-events__month">
              <Space>
                {getMonthByIndex(selectedMonth).month}
                {selectedYear}
              </Space>
            </Paragraph>
            <Button onClick={nextMonth} className="calendar-events__month-switcher-button">
              <Icon icon="chevron-right" size={20} className="calendar-events__month-switcher-icon" />
            </Button>
          </Space>
        </Col>
      </Row>

      <Paragraph className="calendar-events__today-info">
        Today is {currentDate.day}
        <span> </span>
        {calendarDateInst.formatDate(currentDate.date, 'DD MMMM YYYY')}
      </Paragraph>

      <div className="calendar-week-days">
        {weeks.map((week, key) => (
          <div key={key} className="calendar-week-days__item">
            <div
              className={cn('calendar-week-days__cell', {
                active: currentDate.day === week.day && selectedMonth === currentDate.monthIndex,
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
