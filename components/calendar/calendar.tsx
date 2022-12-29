import React, { useState, useEffect } from 'react'
import Typography from 'antd/lib/typography'
import cn from 'classnames'

import CalendarClassDay from './components/CalendarDay/CalendarDay.class'
import CalendarEvent from './components/CalendarEvent/CalendarEvent'
import { CalendarEventType } from './components/CalendarEvent/CalendarEvent.type'

import CalendarMonthComponent from './components/CalendarMonth/CalendarMonth'
import CalendarWeekComponent from './components/CalendarWeek/CalendarWeek'
import CalendarDayComponent from './components/CalendarDay/CalendarDay'

import { ICalendarEvent } from './components/CalendarEvent/CalendarEvent.type'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'

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

const { Text } = Typography

interface ICalendar {
  date: Date
  events?: ICalendarEvent[]
}

function Calendar({ date = new Date(), events = [] }: ICalendar) {
  const [dateState, setDateState] = useState<Date>(date)
  const [calendarView, setCalendarView] = useState<CalendarModeView>('day')
  const dayInst = new CalendarClassDay()

  const today = dayInst.getDay()
  const [selectedMonth, setSelectedMonth] = useState<number>(today.monthIndex)

  const calendarViewClassnames = cn({
    'calendar-events--month-view': calendarView === 'month',
    'calendar-events--week-view': calendarView === 'week',
    'calendar-events--day-view': calendarView === 'day',
  })

  function onHandleDCalendarView(type: CalendarModeView) {
    if (calendarView === 'month' && type === 'day' && today.monthIndex !== selectedMonth) {
      // setSelectedDay(new CalendarDay({ date: new Date(year.year, selectedMonth, 1) }).getDay())
    }
    if (calendarView === 'day' && type === 'month') {
      // setSelectedDay(today)
    }
    setCalendarView(type)
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
                  className={cn('calendar-events__date-view', { active: calendarView === dateType.type })}
                  onClick={() => onHandleDCalendarView(dateType.type as CalendarModeView)}
                >
                  {dateType.title}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      ) : null}

      {calendarView === 'day' ? <CalendarDayComponent date={dateState} events={events} /> : null}
      {calendarView === 'week' ? <CalendarWeekComponent date={dateState} events={events} /> : null}
      {calendarView === 'month' ? <CalendarMonthComponent date={dateState} events={events} /> : null}

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
