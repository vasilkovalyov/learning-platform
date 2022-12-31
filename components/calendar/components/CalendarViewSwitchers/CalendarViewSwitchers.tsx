import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'

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
    <Row justify="end">
      <Space size={20}>
        {dateTypeViews.map((dateType, index) => (
          <Button
            key={index}
            className={cn('calendar-events__view-switcher-button', { active: calendarView === dateType.type })}
            onClick={() => onHandleSwitchView(dateType.type as CalendarModeView)}
          >
            {dateType.title}
          </Button>
        ))}
      </Space>
    </Row>
  )
}

export default CalendarViewSwitchers
