import React, { useState } from 'react'
import cn from 'classnames'

import CalendarClassDay from './components/CalendarDay/CalendarDay.class'

import { eventsTypes } from './components/CalendarEventsTypes/CalendarEventsTypes.data'

import CalendarMonthComponent from './components/CalendarMonth/CalendarMonth'
import CalendarWeekComponent from './components/CalendarWeek/CalendarWeek'
import CalendarDayComponent from './components/CalendarDay/CalendarDay'
import CalendarViewSwitchers from './components/CalendarViewSwitchers/CalendarViewSwitchers'
import CalendarEventsTypes from './components/CalendarEventsTypes/CalendarEventsTypes'

import { ICalendar } from './calendar.type'
import { CalendarModeView } from './calendar.type'

function Calendar({ date = new Date(), events = [], locale = 'en-En' }: ICalendar) {
  const [dateState, setDateState] = useState<Date>(date)
  const [calendarView, setCalendarView] = useState<CalendarModeView>(CalendarModeView.MONTH)
  const dayInst = new CalendarClassDay()

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
      {calendarView === CalendarModeView.DAY ? <CalendarDayComponent date={dateState} events={events} /> : null}
      {calendarView === CalendarModeView.WEEK ? <CalendarWeekComponent date={dateState} events={events} /> : null}
      {calendarView === CalendarModeView.MONTH ? <CalendarMonthComponent date={dateState} events={events} /> : null}
      <CalendarEventsTypes items={eventsTypes} />
    </div>
  )
}

export default Calendar
