import React, { useState } from 'react'
import List from 'antd/lib/list'
import cn from 'classnames'
// import moment from 'moment'
import { createDate, ICreateDate } from './utilities/createDate'
import { createMonth } from './utilities/createMonth'
import { createYear } from './utilities/createYear'
import { getMonthesNames } from './utilities/getMonthesNames'
import { getWeekDaysNames } from './utilities/getWeekDays'
import { getMonthNumberOfDays } from './utilities/getMonthNumberOfDays'

enum CalendarEventTypeColor {
  PERSONAL_LESSON = '#D1EAE7',
  GROUP_LESSON = '#FAEEDF',
  AVAILABLE_TIME = '#E9F4FF',
  UNAVAILABLE_TIME = '#F2F5FA',
}

const firstWeeksDay = 2
const monthNumberOfDays = getMonthNumberOfDays(createDate().monthIndex, createDate().year)
const days = createMonth().createMonthDays()
const prevMonthDays = createMonth({ date: new Date(createDate().year, createDate().monthIndex - 1) }).createMonthDays()
const nextMonthDays = createMonth({ date: new Date(createDate().year, createDate().monthIndex + 1) }).createMonthDays()

const firstDay = days[0]
const lastDay = days[monthNumberOfDays - 1]
const shiftIndex = firstWeeksDay - 1

const numberOfPrevDays =
  firstDay.dayNumberInWeek - 1 - shiftIndex < 0
    ? 7 - (firstWeeksDay - firstDay.dayNumberInWeek)
    : firstDay.dayNumberInWeek - 1 - shiftIndex

const numberOfNextDays =
  7 - lastDay.dayNumberInWeek + shiftIndex > 6
    ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
    : 7 - lastDay.dayNumberInWeek + shiftIndex

const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays
const result: ICreateDate[] = []

for (let i = 0; i < numberOfPrevDays; i++) {
  const inverted = numberOfPrevDays
  result[i] = prevMonthDays[prevMonthDays.length - inverted]
}
for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i++) {
  result[i] = days[i - numberOfPrevDays]
}
for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i++) {
  result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays]
}

console.log('result totla ', result)

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

function Calendar() {
  const [dateView, setDateView] = useState<CalendarModeView>('day')

  function onHandleDateView(type: CalendarModeView) {
    setDateView(type)
  }

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
