import React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ICalendarEventsTypesProps } from './CalendarEventsTypes.type'

function CalendarEventsTypes({ items }: ICalendarEventsTypesProps) {
  return (
    <Box paddingTop={2} paddingBottom={2}>
      <Stack direction="row" spacing={2} className="calendar-event-types">
        {items.map((lessonType, index) => (
          <Box key={index}>
            <Stack direction="row" spacing={2}>
              <Box className="calendar-event-types__color" style={{ backgroundColor: lessonType.color }}></Box>
              <Typography variant="subtitle2" className="MuiTypography color-grey-3">
                {lessonType.title}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default CalendarEventsTypes
