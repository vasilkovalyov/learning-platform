import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import { CalendarModeView } from '../../calendar.type'
import { ICalendarViewSwitchersProps } from './CalendarViewSwitchers.type'
import { dateTypeViews } from './CalendarViewSwitchers.data'

function CalendarViewSwitchers({ selectedView = CalendarModeView.DAY, onClick }: ICalendarViewSwitchersProps) {
  const [calendarView, setCalendarView] = useState<CalendarModeView | null>(selectedView)

  useEffect(() => {
    setCalendarView(selectedView)
  }, [selectedView])

  function onHandleSwitchView(viewType: CalendarModeView) {
    setCalendarView(calendarView)
    onClick(viewType)
  }

  return (
    <div className="calendar-view-switchers">
      <div>
        {dateTypeViews.map((dateType, index) => (
          <button
            key={index}
            className={cn('calendar-view-switchers__button', {
              'calendar-view-switchers__button--active': calendarView === dateType.type,
            })}
            onClick={() => onHandleSwitchView(dateType.type as CalendarModeView)}
          >
            {dateType.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CalendarViewSwitchers
