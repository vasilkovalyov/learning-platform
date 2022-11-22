import React, { useEffect, useState } from 'react'
import List from 'antd/lib/list'
import Typography from 'antd/lib/typography'
import cn from 'classnames'

import CalendarDate, { ICreateDate } from './utilities/CalendarDate'
import CalendarMonth, { IMonth } from './utilities/CalendarMonth'
import CalendarYear from './utilities/CalendarYear'
import CalendarWeek from './utilities/CalendarWeek'
import CalendarDay from './utilities/CalendarDay'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Icon from 'components/Icon'

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
  const [selectedMonth, setSelectedMonth] = useState(currentDate.monthIndex)
  const [selectedYear, setSelectedYear] = useState(currentDate.year)
  const [days, setDays] = useState<ICreateDate[]>([])

  function onHandleDateView(type: CalendarModeView) {
    setDateView(type)
  }

  useEffect(() => {
    setDays(calendarMonthInst.getTotalDaysInView())
    console.log('calendarMonthInst.getTotalDaysInView()', calendarMonthInst.getTotalDaysInView())
  }, [])

  const getMonthByIndex = (index: number): IMonth => {
    let targetMonth!: IMonth
    for (let i = 0; i <= calendarMonthInst.getMonthesNames().length - 1; i++) {
      if (calendarMonthInst.getMonthesNames()[i].monthIndex === index) {
        targetMonth = calendarMonthInst.getMonthesNames()[i]
        break
      }
    }
    return targetMonth
  }

  const isWeekend = (day: string) => day === 'Sunday' || day === 'Saturday'

  function onHandlePrevMonth() {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
      setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear - 1, monthIndex: 11 }))
      return
    }
    setSelectedMonth(selectedMonth - 1)
    setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear, monthIndex: selectedMonth - 1 }))
  }

  function onHandleNextMonth() {
    if (selectedMonth > 10) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
      setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear + 1, monthIndex: 0 }))
      return
    }
    setSelectedMonth(selectedMonth + 1)
    setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear, monthIndex: selectedMonth + 1 }))
  }

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
            <Button onClick={onHandlePrevMonth} className="calendar-events__month-switcher-button">
              <Icon icon="chevron-left" size={20} className="calendar-events__month-switcher-icon" />
            </Button>
            <Paragraph className="calendar-events__month">
              <Space>
                {getMonthByIndex(selectedMonth).month}
                {selectedYear}
              </Space>
            </Paragraph>
            <Button onClick={onHandleNextMonth} className="calendar-events__month-switcher-button">
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
