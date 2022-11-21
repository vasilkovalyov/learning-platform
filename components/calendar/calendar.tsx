import React, { useState } from 'react'
import List from 'antd/lib/list'
import Typography from 'antd/lib/typography'
import cn from 'classnames'
// import moment from 'moment'
import CalendarDate, { ICreateDate } from './utilities/CalendarDate'
import CalendarMonth from './utilities/CalendarMonth'
import CalendarYear from './utilities/CalendarYear'
import CalendarWeek from './utilities/CalendarWeek'
import CalendarDay from './utilities/CalendarDay'

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

const { Paragraph } = Typography

function Calendar() {
  const [dateView, setDateView] = useState<CalendarModeView>('day')
  const calendarMonthInst = new CalendarMonth()
  const dayInst = new CalendarDay()
  const calendarDateInst = new CalendarDate()
  const weeks = new CalendarWeek().getWeekDaysNames()
  const currentDate = calendarDateInst.createDate()
  const days = calendarMonthInst.getTotalDaysInView()

  function onHandleDateView(type: CalendarModeView) {
    setDateView(type)
  }

  const isWeekend = (day: string) => day === 'Sunday' || day === 'Saturday'

  return (
    <div className="calendar-events">
      <List
        className="calendar-events__date-view-list"
        itemLayout="horizontal"
        dataSource={dateTypeViews}
        renderItem={(item) => (
          <List.Item key={item.id} className="calendar-events__date-view-item">
            <List.Item.Meta
              title={
                <button
                  className={cn('calendar-events__date-view', { active: dateView === item.type })}
                  onClick={() => onHandleDateView(item.type as CalendarModeView)}
                >
                  {item.title}
                </button>
              }
            />
          </List.Item>
        )}
      />

      <Paragraph>
        Today is {currentDate.day}
        <span> </span>
        {calendarDateInst.formatDate(currentDate.date, 'DD MMMM YYYY')}
      </Paragraph>

      <div className="calendar-week-days">
        {weeks.map((week, key) => (
          <div key={key} className="calendar-week-days__item">
            <div className={cn('calendar-week-days__cell', { active: currentDate.day === week.day })}>{week.day}</div>
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {days.map((day) => (
          <div key={day.timestamp} className="calendar-days__item">
            <div
              className={cn(
                'calendar-days__cell',
                { today: dayInst.checkIsToday(day.date) },
                { weekend: isWeekend(day.day) },
              )}
            >
              {day.dayNumber}
            </div>
          </div>
        ))}
      </div>

      <List
        className="calendar-events__event-types"
        itemLayout="horizontal"
        dataSource={lessonsTypes}
        renderItem={(item) => (
          <List.Item key={item.id} className="calendar-events__event-type-item">
            <List.Item.Meta
              title={
                <div className="calendar-events__event-type">
                  <div className="calendar-events__event-type-color" style={{ backgroundColor: item.color }}></div>
                  <p className="calendar-events__event-type-heading">{item.title}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Calendar
