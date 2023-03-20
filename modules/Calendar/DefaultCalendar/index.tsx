import React, { useState } from 'react'
import cn from 'classnames'

import CalendarClassDay from '../components/CalendarDay/CalendarDay.class'

import { eventsTypes } from '../components/CalendarEventCategories/CalendarEventCategories.data'

import CalendarMonthComponent from '../components/CalendarMonth'
import CalendarWeekComponent from '../components/CalendarWeek'
import CalendarDayComponent from '../components/CalendarDay'
import CalendarViewSwitchers from '../components/CalendarViewSwitchers'
import CalendarEventsTypes from '../components/CalendarEventCategories'

import { ICalendar } from './default-calendar.type'
import { CalendarModeView } from './default-calendar.type'
import { localeDefault } from '../constants'

function Calendar({
  date = new Date(),
  events = [],
  view = CalendarModeView.MONTH,
  locale = localeDefault,
}: ICalendar) {
  const [dateState, setDateState] = useState<Date>(date)
  const [calendarView, setCalendarView] = useState<CalendarModeView>(view)
  const dayInst = new CalendarClassDay({
    locale: locale,
  })

  const today = dayInst.getDay()
  const [selectedMonth, setSelectedMonth] = useState<number>(today.monthIndex)

  const calendarViewClassnames = cn({
    'calendar-events--month-view': calendarView === 'month',
    'calendar-events--week-view': calendarView === 'week',
    'calendar-events--day-view': calendarView === 'day',
  })

  function onHandleClickViewSwitcher(type: CalendarModeView) {
    if (
      calendarView === CalendarModeView.MONTH &&
      type === CalendarModeView.DAY &&
      today.monthIndex !== selectedMonth
    ) {
      // setSelectedDay(new CalendarDay({ date: new Date(year.year, selectedMonth, 1) }).getDay())
    }
    if (calendarView === CalendarModeView.DAY && type === CalendarModeView.MONTH) {
      // setSelectedDay(today)
    }
    setCalendarView(type)
  }

  return (
    <div className={cn('calendar-events', calendarViewClassnames)}>
      <CalendarViewSwitchers selectedView={calendarView} onClick={onHandleClickViewSwitcher} />
      {calendarView === CalendarModeView.DAY ? (
        <CalendarDayComponent date={dateState} events={events} locale={locale} />
      ) : null}
      {calendarView === CalendarModeView.WEEK ? (
        <CalendarWeekComponent date={dateState} events={events} locale={locale} />
      ) : null}
      {calendarView === CalendarModeView.MONTH ? (
        <CalendarMonthComponent date={dateState} events={events} locale={locale} />
      ) : null}
      <CalendarEventsTypes items={eventsTypes} />
    </div>
  )
}

export default Calendar
