import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { CalendarModeView } from '../../DefaultCalendar/default-calendar.type'
import { CalendarViewSwitchersProps } from './CalendarViewSwitchers.type'
import { dateTypeViews } from './CalendarViewSwitchers.data'

function CalendarViewSwitchers({ selectedView = CalendarModeView.DAY, onClick }: CalendarViewSwitchersProps) {
  const [calendarView, setCalendarView] = useState<CalendarModeView | null>(null)

  useEffect(() => {
    setCalendarView(selectedView)
  }, [selectedView])

  function onHandleSwitchView(viewType: CalendarModeView) {
    setCalendarView(calendarView)
    onClick(viewType)
  }

  return (
    <Box className="calendar-view-switchers" marginBottom={2}>
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        {dateTypeViews.map((dateType, index) => (
          <Button
            variant="text"
            key={index}
            className={cn('calendar-view-switchers__button', {
              'calendar-view-switchers__button--active': calendarView === dateType.type,
            })}
            onClick={() => onHandleSwitchView(dateType.type as CalendarModeView)}
          >
            {dateType.title}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

export default CalendarViewSwitchers
